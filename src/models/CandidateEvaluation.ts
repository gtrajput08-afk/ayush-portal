import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICandidateEvaluation extends Document {
  _id: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  evaluatorId: mongoose.Types.ObjectId;
  mentorType: "internal" | "external";
  problemSolving: number; // 1 to 5
  communication: number; // 1 to 5
  curiosity: number; // 1 to 5
  practicalInstincts: number; // 1 to 5
  hiddenGemsNotes: string;
  projectsBuiltReview?: string;
  overallVerdict: "Strongly Recommended" | "Recommended" | "Needs Development";
  createdAt: Date;
  updatedAt: Date;
}

const CandidateEvaluationSchema = new Schema<ICandidateEvaluation>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    evaluatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mentorType: {
      type: String,
      required: true,
      enum: ["internal", "external"],
    },
    problemSolving: { type: Number, min: 1, max: 5, required: true },
    communication: { type: Number, min: 1, max: 5, required: true },
    curiosity: { type: Number, min: 1, max: 5, required: true },
    practicalInstincts: { type: Number, min: 1, max: 5, required: true },
    hiddenGemsNotes: { type: String, required: true },
    projectsBuiltReview: { type: String, default: "" },
    overallVerdict: {
      type: String,
      enum: ["Strongly Recommended", "Recommended", "Needs Development"],
      default: "Recommended",
    },
  },
  { timestamps: true }
);

export const CandidateEvaluation: Model<ICandidateEvaluation> =
  mongoose.models.CandidateEvaluation ||
  mongoose.model<ICandidateEvaluation>("CandidateEvaluation", CandidateEvaluationSchema);
