import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import storyRoutes from "./routes/story.routes.js";
import authRoutes from "./routes/authroutes.js";
import giftRoutes from "./routes/gift.routes.js";
import { excuseRoutes } from "./routes/excuse.routes.js";
import { connectDB } from "./db.js";

const app = express();

// === Middleware ===
app.use(express.json());
app.use(cors());

// Fix COOP for Firebase popup login without blocking external resources
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

// Auto-connect to MongoDB on incoming API requests (essential for Vercel serverless functions)
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Database connection failure:", error.message);
  }
  next();
});

// === API Routes ===
app.use("/api/auth", authRoutes);
app.use("/api/story", storyRoutes);
app.use("/api/gift", giftRoutes);
app.use("/api/excuse", excuseRoutes);

// === Health & Test Routes ===
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "StorySprout API is running smoothly 🚀",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "🚀 StorySprout API is running" });
});

app.get("/", (req, res) => {
  res.send("🚀 StorySprout API is running");
});

export default app;
