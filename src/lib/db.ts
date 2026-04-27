import mongoose from 'mongoose';

// Force Google DNS ONLY in development — local DNS blocks SRV queries on this network
// In production, this causes crashes on serverless platforms.
if (process.env.NODE_ENV === 'development') {
  const dns = require('node:dns');
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
  dns.setDefaultResultOrder('ipv4first');
}


declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  } | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI?.trim();

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
