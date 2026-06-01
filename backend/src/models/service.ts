import mongoose, { Schema } from "mongoose";

const ServiceSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, default: "bg-electric-red" },
  textColor: { type: String, default: "text-ink-black" },
  metrics: [{ label: String, value: String }]
});

export const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);
