import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: "student" | "academician" | "industry";
  stream?: "Ayurveda" | "Yoga" | "Unani" | "Siddha" | "Homeopathy";
  mentorType?: "internal" | "external";
  isVerified: boolean;
  institution?: string;
  designation?: string;
  phone?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["student", "academician", "industry"],
    },
    stream: {
      type: String,
      enum: ["Ayurveda", "Yoga", "Unani", "Siddha", "Homeopathy"],
      required: function (this: IUser) {
        return this.role === "student";
      },
    },
    mentorType: {
      type: String,
      enum: ["internal", "external"],
      required: function (this: IUser) {
        return this.role === "academician" || this.role === "industry";
      },
    },
    isVerified: { type: Boolean, default: true },
    institution: { type: String, default: "" },
    designation: { type: String, default: "" },
    phone: { type: String, default: "" },
    bio: { type: String, default: "" },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
