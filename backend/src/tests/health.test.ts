import request from "supertest";
import { app } from "../index";
import mongoose from "mongoose";

describe("GET /api/health", () => {
  // Gracefully close connection after all tests to prevent Jest from hanging
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should return 200 OK and operational status", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "operational");
    expect(res.body).toHaveProperty("service", "Blinx Lab API");
    expect(res.body).toHaveProperty("version", "2.0.0");
  });
});
