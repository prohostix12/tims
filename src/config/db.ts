import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('❌ Please define the MONGODB_URI environment variable');
}

/**
 * Connect to MongoDB. This function is idempotent – it will reuse an existing
 * connection if one is already established. It also caches the promise so that
 * concurrent calls wait for the same connection.
 */
export default async function connectDB() {
  // If already connected or connecting, reuse it.
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  // Cache the connection promise on the global object (Node's global).
  // This prevents multiple parallel connections during hot reloads.
  if ((global as any)._mongoPromise) {
    await (global as any)._mongoPromise;
    return;
  }

  (global as any)._mongoPromise = mongoose.connect(MONGODB_URI, {
    // You can add mongoose options here if needed, e.g., useNewUrlParser, useUnifiedTopology
  });

  await (global as any)._mongoPromise;
  console.log('✅ MongoDB connected');
}
