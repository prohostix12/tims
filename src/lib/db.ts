import mongoose from 'mongoose';
import dns from 'node:dns';

if (process.env.NODE_ENV === 'development') {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
  dns.setDefaultResultOrder('ipv4first');
}

import '@/models/University';
import '@/models/Program';
import '@/models/Batch';
import '@/models/Enrollment';
import '@/models/Blog';
import '@/models/Director';
import '@/models/Faq';
import '@/models/HowItWorksStep';
import '@/models/Lead';
import '@/models/MarqueeItem';
import '@/models/Message';
import '@/models/News';
import '@/models/Result';
import '@/models/SeoSettings';
import '@/models/Service';
import '@/models/Session';
import '@/models/Stat';
import '@/models/StudyMaterial';
import '@/models/Syllabus';
import '@/models/Testimonial';
import '@/models/Timetable';
import '@/models/UniversityLogo';
import '@/models/CourseFinderQuestion';
import '@/models/AdminConfig';
import '@/models/OtpVerification';
import '@/models/ScholarshipQuestion';
import '@/models/ScholarshipConfig';
import '@/models/ScholarshipApplication';
import '@/models/ScholarshipContent';

declare global {
  var _mongoCache: { conn: mongoose.Mongoose | null; promise: Promise<mongoose.Mongoose> | null } | undefined;
  var _memoryServer: any;
  var _atlasUnreachable: boolean | undefined;
}

const cached = global._mongoCache ?? (global._mongoCache = { conn: null, promise: null });

async function connectToLocal(): Promise<mongoose.Mongoose> {
  try { await mongoose.disconnect(); } catch {}

  if (!global._memoryServer) {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    global._memoryServer = await MongoMemoryServer.create();
    console.log('[DB] Local MongoDB started at', global._memoryServer.getUri());
  }

  const m = await mongoose.connect(global._memoryServer.getUri(), { bufferCommands: false });
  console.log('[DB] Connected to local MongoDB');
  return m;
}

async function connectDB(): Promise<mongoose.Mongoose> {
  // Return live connection
  if (cached.conn && mongoose.connection.readyState === 1) return cached.conn;

  // If a connection attempt is already in progress, wait for it
  if (cached.promise) {
    try { cached.conn = await cached.promise; return cached.conn!; } catch {}
  }

  // Reset stale connection
  cached.conn = null;
  cached.promise = null;

  const ATLAS_URI = process.env.MONGODB_URI?.trim();
  if (!ATLAS_URI) throw new Error('MONGODB_URI not defined in .env.local');

  cached.promise = (async () => {
    // Skip Atlas if we already know it's unreachable
    if (!global._atlasUnreachable) {
      try {
        const m = await mongoose.connect(ATLAS_URI, {
          bufferCommands: false,
          serverSelectionTimeoutMS: 5000,
        });
        console.log('[DB] Connected to MongoDB Atlas');
        global._atlasUnreachable = false;
        return m;
      } catch {
        console.warn('[DB] Atlas unreachable — falling back to local MongoDB (will not retry Atlas)');
        global._atlasUnreachable = true;
      }
    } else {
      console.log('[DB] Skipping Atlas (known unreachable) — using local MongoDB');
    }

    return connectToLocal();
  })();

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
