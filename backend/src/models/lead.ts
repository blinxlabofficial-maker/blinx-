import mongoose, { Schema } from "mongoose";

const LeadSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  brand: { type: String, required: true },
  budget: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Lead = mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
