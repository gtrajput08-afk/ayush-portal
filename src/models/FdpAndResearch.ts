import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFdpAndResearch extends Document {
  _id: mongoose.Types.ObjectId;
  postedBy: mongoose.Types.ObjectId;
  type: "FDP" | "Research Project" | "Consultancy";
  title: string;
  description: string;
  stream: "Ayurveda" | "Yoga" | "Unani" | "Siddha" | "Homeopathy" | "All";
  eligibility: string;
  fundingAmount?: string;
  duration: string;
  status: "Open" | "In Progress" | "Completed";
  createdAt: Date;
  updatedAt: Date;
}

const FdpAndResearchSchema = new Schema<IFdpAndResearch>(
  {
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      required: true,
      enum: ["FDP", "Research Project", "Consultancy"],
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    stream: {
      type: String,
      required: true,
      enum: ["Ayurveda", "Yoga", "Unani", "Siddha", "Homeopathy", "All"],
      default: "All",
    },
    eligibility: { type: String, default: "AYUSH Faculty / Researchers / Industry Collaborators" },
    fundingAmount: { type: String, default: "Institutional / Ministry Grant" },
    duration: { type: String, default: "6 Months" },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Completed"],
      default: "Open",
    },
  },
  { timestamps: true }
);

export const FdpAndResearch: Model<IFdpAndResearch> =
  mongoose.models.FdpAndResearch ||
  mongoose.model<IFdpAndResearch>("FdpAndResearch", FdpAndResearchSchema);
