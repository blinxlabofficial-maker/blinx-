import mongoose from "mongoose";
import { logger } from "./logger";

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

export async function connectDatabase(): Promise<void> {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    logger.warn("⚠ MONGO_URI not set. Running in JSON-fallback mode only.");
    return;
  }

  let retries = 0;

  const connect = async (): Promise<void> => {
    try {
      await mongoose.connect(uri);
      logger.info("✓ MongoDB connected successfully");
    } catch (error) {
      retries++;
      if (retries <= MAX_RETRIES) {
        logger.warn(`⚠ MongoDB connection attempt ${retries}/${MAX_RETRIES} failed. Retrying in ${RETRY_DELAY_MS / 1000}s...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
        return connect();
      }
      logger.error("✗ MongoDB connection failed after max retries. Using JSON fallback.");
    }
  };

  // Connection event handlers
  mongoose.connection.on("connected", () => {
    logger.info("⚡ MongoDB connection established");
  });

  mongoose.connection.on("disconnected", () => {
    logger.warn("⚠ MongoDB disconnected");
  });

  mongoose.connection.on("error", (err) => {
    logger.error(`✗ MongoDB connection error: ${err.message}`);
  });

  await connect();
}

export function isMongoConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
