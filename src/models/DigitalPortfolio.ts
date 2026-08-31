import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVerifiedSkill {
  name: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  verifiedBy?: string;
  verifiedDate?: Date;
  badge: "Bronze" | "Silver" | "Gold" | "Ayush Master";
}

export interface ICertificate {
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  verificationStatus: "Verified" | "Pending Review";
}

export interface IStudentProject {
  title: string;
  description: string;
  stream: string;
  link?: string;
  status: "Completed" | "In Progress";
}

export interface IDigitalPortfolio extends Document {
  _id: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  headline?: string;
  bio?: string;
  verifiedSkills: IVerifiedSkill[];
  certificates: ICertificate[];
  projects: IStudentProject[];
  createdAt: Date;
  updatedAt: Date;
}

const DigitalPortfolioSchema = new Schema<IDigitalPortfolio>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    headline: { type: String, default: "Aspiring AYUSH Practitioner & Researcher" },
    bio: { type: String, default: "Passionate about traditional healthcare integration and evidence-based clinical practices." },
    verifiedSkills: [
      {
        name: { type: String, required: true },
        category: { type: String, default: "Clinical" },
        level: {
          type: String,
          enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
          default: "Intermediate",
        },
        verifiedBy: { type: String, default: "Ayush Skill Assessment Engine" },
        verifiedDate: { type: Date, default: Date.now },
        badge: {
          type: String,
          enum: ["Bronze", "Silver", "Gold", "Ayush Master"],
          default: "Silver",
        },
      },
    ],
    certificates: [
      {
        title: { type: String, required: true },
        issuer: { type: String, required: true },
        issueDate: { type: String, required: true },
        credentialUrl: { type: String, default: "" },
        verificationStatus: {
          type: String,
          enum: ["Verified", "Pending Review"],
          default: "Verified",
        },
      },
    ],
    projects: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        stream: { type: String, default: "Ayurveda" },
        link: { type: String, default: "" },
        status: {
          type: String,
          enum: ["Completed", "In Progress"],
          default: "Completed",
        },
      },
    ],
  },
  { timestamps: true }
);

export const DigitalPortfolio: Model<IDigitalPortfolio> =
  mongoose.models.DigitalPortfolio ||
  mongoose.model<IDigitalPortfolio>("DigitalPortfolio", DigitalPortfolioSchema);
