import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "ayush_portal_jwt_secret_sih2024_ps26044_9f8e7d6c5b4a3210";

export interface JWTPayload {
  userId: string;
  email: string;
  role: "student" | "academician" | "industry";
  stream?: "Ayurveda" | "Yoga" | "Unani" | "Siddha" | "Homeopathy";
  mentorType?: "internal" | "external";
  name: string;
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}
