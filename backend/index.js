// backend/index.js - Standalone Express server entry point
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./db.js";

const PORT = process.env.PORT || 8081;

// Pre-connect to MongoDB on startup
connectDB().catch((err) => {
  console.error("❌ MongoDB connection error on server startup:", err.message);
});

// Start listening
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
