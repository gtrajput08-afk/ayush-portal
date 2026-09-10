import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Application } from "@/models/Application";
import { DigitalPortfolio } from "@/models/DigitalPortfolio";
import { CandidateEvaluation } from "@/models/CandidateEvaluation";
import { SkillAssessment } from "@/models/SkillAssessment";
import { ApplicationStatusSchema } from "@/lib/validations";
import { getAuthUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/internships/[id]/applicants - fetch applicants for an internship with pagination
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = getAuthUser(request);
    if (!authUser || (authUser.role !== "industry" && authUser.role !== "academician")) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    await connectToDatabase();
    const internshipId = params.id;
    const { searchParams } = new URL(request.url);

    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
    const skip = (page - 1) * limit;

    const [total, applications] = await Promise.all([
      Application.countDocuments({ internshipId }),
      Application.find({ internshipId })
        .populate("studentId", "name email stream institution designation isVerified")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
    ]);

    // Enrich with portfolio & evaluation ratings
    const enriched = await Promise.all(
      applications.map(async (app) => {
        const student = app.studentId as any;
        if (!student) return app;

        const portfolio = await DigitalPortfolio.findOne({ studentId: student._id });
        const evaluations = await CandidateEvaluation.find({ studentId: student._id });
        const lastAssessment = await SkillAssessment.findOne({ studentId: student._id }).sort({ createdAt: -1 });

        return {
          ...app.toObject(),
          portfolio: portfolio
            ? {
                verifiedSkills: portfolio.verifiedSkills,
                certificates: portfolio.certificates,
                projects: portfolio.projects,
              }
            : null,
          evaluations,
          skillAssessment: lastAssessment
            ? {
                score: lastAssessment.score,
                percentage: lastAssessment.percentage,
                gapAnalysis: lastAssessment.gapAnalysis,
              }
            : null,
        };
      })
    );

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      applicants: enriched,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error: any) {
    console.error("Fetch applicants error:", error);
    return NextResponse.json({ error: "Failed to fetch applicants" }, { status: 500 });
  }
}

// PATCH /api/internships/[id]/applicants - update applicant status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = getAuthUser(request);
    if (!authUser || (authUser.role !== "industry" && authUser.role !== "academician")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await connectToDatabase();
    const rawBody = await request.json();

    const validation = ApplicationStatusSchema.safeParse(rawBody);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { applicationId, status, feedbackNote } = validation.data;

    const application = await Application.findById(applicationId);
    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    application.status = status;
    if (feedbackNote) {
      application.mentorFeedback.push({
        authorId: authUser.userId as any,
        authorName: authUser.name,
        authorRole: `${authUser.role.toUpperCase()} (${authUser.mentorType || "Mentor"})`,
        comment: feedbackNote,
        createdAt: new Date(),
      });
    }

    await application.save();

    return NextResponse.json({ message: "Status updated successfully", application });
  } catch (error: any) {
    console.error("Update applicant error:", error);
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}
