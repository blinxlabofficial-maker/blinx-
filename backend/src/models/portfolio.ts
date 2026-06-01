import mongoose, { Schema } from "mongoose";

const FlowNodeSchema = new Schema({
  id: { type: String, required: true, unique: true },
  parentId: { type: String, default: null },
  type: { type: String, required: true, enum: ["root", "service", "client", "work"] },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  color: { type: String, default: "bg-electric-red" },
  chips: [String],
  metrics: [{ label: String, value: String }],
  caseStudy: {
    description: { type: String, default: "" },
    media: [String]
  }
});

export const FlowNode = mongoose.models.FlowNode || mongoose.model("FlowNode", FlowNodeSchema);
