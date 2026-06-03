import mongoose, { Schema } from "mongoose";

const TeamMemberSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  specialty: { type: String, required: true },
  color: { type: String, default: "bg-electric-red" },
  photo: { type: String, default: "" },
});

export const TeamMember = mongoose.models.TeamMember || mongoose.model("TeamMember", TeamMemberSchema);
