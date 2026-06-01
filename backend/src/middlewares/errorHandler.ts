import { Request, Response, NextFunction } from "express";

/**
 * Custom application error with HTTP status code.
 */
export class AppError extends Error {
  public statusCode: number;
  public code: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number, code: string = "INTERNAL_ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Global error handling middleware.
 * Must be registered LAST with app.use() (4-argument signature).
 */
export function globalErrorHandler(err: any, req: Request, res: Response, _next: NextFunction): void {
  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let code = err.code || "INTERNAL_ERROR";

  // Mongoose validation error
  if (err.name === "ValidationError" && err.errors) {
    statusCode = 400;
    code = "MONGOOSE_VALIDATION_ERROR";
    const messages = Object.values(err.errors).map((e: any) => e.message);
    message = messages.join(". ");
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    code = "DUPLICATE_KEY";
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `Duplicate value for '${field}'. This record already exists.`;
  }

  // Mongoose cast error (invalid ObjectId, etc.)
  if (err.name === "CastError") {
    statusCode = 400;
    code = "INVALID_ID";
    message = `Invalid value for '${err.path}': ${err.value}`;
  }

  // JSON parse error
  if (err.type === "entity.parse.failed") {
    statusCode = 400;
    code = "INVALID_JSON";
    message = "Invalid JSON in request body.";
  }

  // Development: include full error stack
  const isDev = process.env.NODE_ENV !== "production";

  console.error(`[ERROR] ${statusCode} ${code}: ${message}`);
  if (isDev && err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    error: message,
    code,
    ...(isDev && { stack: err.stack })
  });
}

/**
 * Catch unhandled rejections and uncaught exceptions for graceful shutdown.
 */
export function setupProcessErrorHandlers(): void {
  process.on("unhandledRejection", (reason: any) => {
    console.error("⚠ UNHANDLED REJECTION:", reason);
  });

  process.on("uncaughtException", (error: Error) => {
    console.error("⚠ UNCAUGHT EXCEPTION:", error);
    // Give time to log, then exit
    setTimeout(() => process.exit(1), 1000);
  });
}
