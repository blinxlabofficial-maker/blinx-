import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import { connectDatabase } from "./config/db";
import { seedDatabase } from "./services/seeder";
import { globalErrorHandler, setupProcessErrorHandlers } from "./middlewares/errorHandler";

import apiRoutes from "./routes/api";
import authRoutes from "./routes/auth";
import uploadRoutes from "./routes/upload";

// Load environment variables
dotenv.config();

// Setup process-level error handlers
setupProcessErrorHandlers();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// ==========================================
// SECURITY MIDDLEWARE
// ==========================================

// Helmet — secure HTTP headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS — environment-based allowed origins
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map(o => o.trim())
  : ["http://localhost:3000", "http://localhost:5173"];

app.use(cors({
  origin: corsOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ==========================================
// RATE LIMITING
// ==========================================

// General API rate limit
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // 200 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later.", code: "RATE_LIMIT" }
});

// Strict rate limit for lead/contact form (anti-spam)
const leadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 submissions per hour per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions. Please try again later.", code: "LEAD_RATE_LIMIT" }
});

// Auth rate limit (anti-brute-force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 login attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts. Please try again later.", code: "AUTH_RATE_LIMIT" }
});

// ==========================================
// BODY PARSING & LOGGING
// ==========================================

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request logging
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// ==========================================
// ROUTES
// ==========================================

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "operational",
    service: "Blinx Lab API",
    version: "2.0.0",
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`
  });
});

// Apply rate limiters to specific routes
app.use("/api/auth", authLimiter);
app.use("/api/leads", leadLimiter);

// API Routes (general limiter applied to all)
app.use("/api", generalLimiter, apiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

// Root
app.get("/", (req, res) => {
  res.json({
    message: "⚡ Blinx_ Lab API is running",
    docs: "/api/health",
    version: "2.0.0"
  });
});

// ==========================================
// GLOBAL ERROR HANDLER (must be last)
// ==========================================
app.use(globalErrorHandler);

// ==========================================
// START SERVER
// ==========================================

async function startServer() {
  // Connect to MongoDB (with retry logic)
  await connectDatabase();

  // Seed default data if database is empty
  try {
    const mongoose = await import("mongoose");
    if (mongoose.connection.readyState === 1) {
      await seedDatabase();
    }
  } catch (err) {
    console.warn("⚠ Seeding skipped (MongoDB not available)");
  }

  app.listen(PORT, () => {
    console.log(`\n⚡ Blinx_ Lab API v2.0.0`);
    console.log(`  → Environment: ${NODE_ENV}`);
    console.log(`  → Port: ${PORT}`);
    console.log(`  → CORS Origins: ${corsOrigins.join(", ")}`);
    console.log(`  → Health: http://localhost:${PORT}/api/health\n`);
  });
}

startServer();
