import mongoose, { Schema, Document, Model } from "mongoose";

export interface IApplicationFeedback {
  authorId: mongoose.Types.ObjectId;
  authorName: string;
  authorRole: string;
  comment: string;
  createdAt: Date;
}

export interface IApplication extends Document {
  _id: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  internshipId: mongoose.Types.ObjectId;
  status: "Applied" | "Shortlisted" | "Under Review" | "Rejected" | "Selected";
  coverNote?: string;
  mentorFeedback: IApplicationFeedback[];
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    internshipId: { type: Schema.Types.ObjectId, ref: "Internship", required: true, index: true },
    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Under Review", "Rejected", "Selected"],
      default: "Applied",
      index: true,
    },
    coverNote: { type: String, default: "" },
    mentorFeedback: [
      {
        authorId: { type: Schema.Types.ObjectId, ref: "User" },
        authorName: { type: String, required: true },
        authorRole: { type: String, required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Compound Unique Index to prevent duplicate applications + fast lookup
ApplicationSchema.index({ studentId: 1, internshipId: 1 }, { unique: true });
ApplicationSchema.index({ internshipId: 1, status: 1, createdAt: -1 });
ApplicationSchema.index({ studentId: 1, status: 1 });

export const Application: Model<IApplication> =
  mongoose.models.Application || mongoose.model<IApplication>("Application", ApplicationSchema);
