import { Service } from "../models/service";
import { TeamMember } from "../models/team";
import { FlowNode } from "../models/portfolio";
import { Admin } from "../models/admin";
import { DEFAULT_SERVICES, DEFAULT_TEAM, DEFAULT_PORTFOLIO } from "./seeder_data";

export async function seedDatabase() {
  try {
    // Seed admin user from env (keep if exists to avoid resetting custom admin passwords)
    const adminCount = await Admin.countDocuments({});
    if (adminCount === 0) {
      const adminEmail = process.env.ADMIN_EMAIL || "admin@blinxlab.com";
      const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

      const admin = new Admin({
        email: adminEmail,
        password: adminPassword
      });
      await admin.save();
      console.log(`✓ Admin user seeded: ${adminEmail}`);
    }

    // Always re-seed services, team, and portfolio to keep them synced with latest definitions
    await Service.deleteMany({});
    await Service.insertMany(DEFAULT_SERVICES);
    console.log("✓ Default Services seeded successfully!");

    await TeamMember.deleteMany({});
    await TeamMember.insertMany(DEFAULT_TEAM);
    console.log("✓ Default Team Members seeded successfully!");

    await FlowNode.deleteMany({});
    await FlowNode.insertMany(DEFAULT_PORTFOLIO);
    console.log("✓ Default Portfolio Map Nodes seeded successfully!");
  } catch (error) {
    console.error("✗ Seeding database failed:", error);
  }
}

// Standalone execution support for `npm run seed`
if (require.main === module) {
  require("dotenv").config();
  const mongoose = require("mongoose");
  
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("No MONGO_URI provided.");
    process.exit(1);
  }
  
  mongoose.connect(uri).then(async () => {
    console.log("Connected to MongoDB for seeding...");
    await seedDatabase();
    process.exit(0);
  }).catch((err: any) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
}
