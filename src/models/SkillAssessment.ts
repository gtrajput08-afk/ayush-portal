import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQuizAnswer {
  questionId: string;
  questionText: string;
  selectedOption: number;
  correctOption: number;
  isCorrect: boolean;
  category: string;
}

export interface IGapAnalysis {
  strengths: string[];
  gaps: string[];
  recommendations: string[];
}

export interface ISkillAssessment extends Document {
  _id: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  stream: "Ayurveda" | "Yoga" | "Unani" | "Siddha" | "Homeopathy";
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: IQuizAnswer[];
  gapAnalysis: IGapAnalysis;
  createdAt: Date;
  updatedAt: Date;
}

const SkillAssessmentSchema = new Schema<ISkillAssessment>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    stream: {
      type: String,
      required: true,
      enum: ["Ayurveda", "Yoga", "Unani", "Siddha", "Homeopathy"],
    },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    percentage: { type: Number, required: true },
    answers: [
      {
        questionId: { type: String, required: true },
        questionText: { type: String, required: true },
        selectedOption: { type: Number, required: true },
        correctOption: { type: Number, required: true },
        isCorrect: { type: Boolean, required: true },
        category: { type: String, default: "Core Knowledge" },
      },
    ],
    gapAnalysis: {
      strengths: [{ type: String }],
      gaps: [{ type: String }],
      recommendations: [{ type: String }],
    },
  },
  { timestamps: true }
);

export const SkillAssessment: Model<ISkillAssessment> =
  mongoose.models.SkillAssessment ||
  mongoose.model<ISkillAssessment>("SkillAssessment", SkillAssessmentSchema);
