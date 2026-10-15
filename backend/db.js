import mongoose from "mongoose";

let cachedConnection = null;

/**
 * Connect to MongoDB with caching for serverless environments (Vercel)
 * and traditional long-running Node servers.
 */
export const connectDB = async () => {
  // If already connected, reuse existing connection
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("⚠️ MONGODB_URI environment variable is missing.");
    return null;
  }

  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    cachedConnection = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
      bufferCommands: false, // In serverless, fail fast if not connected
    });
    console.log("✅ Connected to MongoDB");
    return cachedConnection;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    cachedConnection = null;
    throw err;
  }
};

export default connectDB;
