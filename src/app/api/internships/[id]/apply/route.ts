import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Application } from "@/models/Application";
import { Internship } from "@/models/Internship";
import { ApplicationCreateSchema } from "@/lib/validations";
import { getAuthUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = getAuthUser(request);
    if (!authUser || authUser.role !== "student") {
      return NextResponse.json(
        { error: "Only authenticated student accounts can apply for internships." },
        { status: 403 }
      );
    }

    await connectToDatabase();
    const internshipId = params.id;

    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return NextResponse.json({ error: "Internship opportunity not found" }, { status: 404 });
    }

    const existingApplication = await Application.findOne({
      studentId: authUser.userId,
      internshipId,
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this position." },
        { status: 409 }
      );
    }

    const rawBody = await request.json().catch(() => ({}));
    const validation = ApplicationCreateSchema.safeParse(rawBody);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { coverNote } = validation.data;

    const application = await Application.create({
      studentId: authUser.userId,
      internshipId,
      status: "Applied",
      coverNote,
      mentorFeedback: [
        {
          authorId: authUser.userId,
          authorName: "System Verification",
          authorRole: "AYUSH Assessment Portal",
          comment: "Application submitted and queued for mentor review.",
          createdAt: new Date(),
        },
      ],
    });

    return NextResponse.json(
      { message: "Application submitted successfully!", application },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Apply error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
