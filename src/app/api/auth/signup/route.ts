import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { DigitalPortfolio } from "@/models/DigitalPortfolio";
import { SignupSchema } from "@/lib/validations";
import { signToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const validation = SignupSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, email, password, role, stream, mentorType, institution, designation } = validation.data;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role,
      stream: role === "student" ? stream : undefined,
      mentorType: (role === "academician" || role === "industry") ? mentorType : undefined,
      institution: institution || "",
      designation: designation || "",
      isVerified: true,
    });

    // If student, create default digital portfolio
    if (role === "student") {
      await DigitalPortfolio.create({
        studentId: newUser._id,
        headline: `${stream} Scholar & Aspiring Practitioner`,
        bio: `Dedicated student in ${stream} enthusiastic about clinical excellence, pharmacognosy, and evidence-based integrative therapies.`,
        verifiedSkills: [
          {
            name: `${stream} Fundamentals & Philosophy`,
            category: "Core Theory",
            level: "Intermediate",
            verifiedBy: "AYUSH National Assessment Framework",
            badge: "Silver",
          },
          {
            name: "Basic Diagnostics & Pulse Assessment",
            category: "Clinical Diagnostics",
            level: "Beginner",
            verifiedBy: "Ayush Skill Assessment Engine",
            badge: "Bronze",
          }
        ],
        certificates: [
          {
            title: `Foundations of Evidence-based ${stream}`,
            issuer: "Ministry of Ayush / NCISM",
            issueDate: "2025-11-15",
            credentialUrl: "https://ayush.gov.in/verify/AYU-CERT-2025",
            verificationStatus: "Verified",
          }
        ],
        projects: [
          {
            title: `Comparative Analysis of ${stream} Formulations`,
            description: "Documented classical preparation methods and clinical indications.",
            stream: stream || "Ayurveda",
            status: "Completed",
          }
        ]
      });
    }

    const token = signToken({
      userId: newUser._id.toString(),
      email: newUser.email,
      role: newUser.role,
      stream: newUser.stream,
      mentorType: newUser.mentorType,
      name: newUser.name,
    });

    const response = NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          stream: newUser.stream,
          mentorType: newUser.mentorType,
          institution: newUser.institution,
          designation: newUser.designation,
        },
        token,
      },
      { status: 201 }
    );

    response.cookies.set("ayush_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create account" },
      { status: 500 }
    );
  }
}
