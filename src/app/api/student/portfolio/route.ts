import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { DigitalPortfolio } from "@/models/DigitalPortfolio";
import { Application } from "@/models/Application";
import { getAuthUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthUser(request);
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const targetStudentId = searchParams.get("studentId") || authUser.userId;

    let portfolio = await DigitalPortfolio.findOne({ studentId: targetStudentId });
    if (!portfolio && targetStudentId === authUser.userId) {
      portfolio = await DigitalPortfolio.create({
        studentId: authUser.userId,
        headline: `${authUser.stream || "AYUSH"} Scholar`,
        bio: "Dedicated to advancing AYUSH healthcare and clinical excellence.",
        verifiedSkills: [],
        certificates: [],
        projects: [],
      });
    }

    // Fetch student applications
    const applications = await Application.find({ studentId: targetStudentId })
      .populate("internshipId")
      .sort({ createdAt: -1 });

    return NextResponse.json({ portfolio, applications });
  } catch (error: any) {
    console.error("Portfolio fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch portfolio" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authUser = getAuthUser(request);
    if (!authUser || authUser.role !== "student") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();
    const { headline, bio, projects, certificates } = body;

    const portfolio = await DigitalPortfolio.findOneAndUpdate(
      { studentId: authUser.userId },
      {
        ...(headline !== undefined && { headline }),
        ...(bio !== undefined && { bio }),
        ...(projects !== undefined && { projects }),
        ...(certificates !== undefined && { certificates }),
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ message: "Portfolio updated successfully", portfolio });
  } catch (error: any) {
    console.error("Portfolio update error:", error);
    return NextResponse.json({ error: "Failed to update portfolio" }, { status: 500 });
  }
}
