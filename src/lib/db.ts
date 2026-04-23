import mongoose from 'mongoose';
import dns from 'node:dns';
import { setDefaultResultOrder } from 'node:dns';

// Force Google DNS — local DNS blocks SRV queries on this network
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
setDefaultResultOrder('ipv4first');

const MONGODB_URI = process.env.MONGODB_URI;

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
      family: 4, // Force IPv4 — fixes SRV resolution issues on some networks
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
