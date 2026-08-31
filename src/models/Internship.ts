import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInternship extends Document {
  _id: mongoose.Types.ObjectId;
  postedBy: mongoose.Types.ObjectId;
  title: string;
  description: string;
  requiredSkills: string[];
  stream: "Ayurveda" | "Yoga" | "Unani" | "Siddha" | "Homeopathy" | "All";
  location: {
    state: string;
    district: string;
  };
  stipend: string;
  duration: string;
  type: "On-site" | "Remote" | "Hybrid";
  openings: number;
  status: "Active" | "Closed";
  createdAt: Date;
  updatedAt: Date;
}

const InternshipSchema = new Schema<IInternship>(
  {
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    requiredSkills: [{ type: String }],
    stream: {
      type: String,
      required: true,
      enum: ["Ayurveda", "Yoga", "Unani", "Siddha", "Homeopathy", "All"],
    },
    location: {
      state: { type: String, required: true },
      district: { type: String, required: true },
    },
    stipend: { type: String, default: "Negotiable / Stipend Provided" },
    duration: { type: String, default: "3 Months" },
    type: {
      type: String,
      enum: ["On-site", "Remote", "Hybrid"],
      default: "On-site",
    },
    openings: { type: Number, default: 2 },
    status: {
      type: String,
      enum: ["Active", "Closed"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export const Internship: Model<IInternship> =
  mongoose.models.Internship || mongoose.model<IInternship>("Internship", InternshipSchema);
