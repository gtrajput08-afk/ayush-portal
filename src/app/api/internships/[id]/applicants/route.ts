import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Application } from "@/models/Application";
import { DigitalPortfolio } from "@/models/DigitalPortfolio";
import { CandidateEvaluation } from "@/models/CandidateEvaluation";
import { SkillAssessment } from "@/models/SkillAssessment";
import { ApplicationStatusSchema } from "@/lib/validations";
import { getAuthUser } from "@/lib/auth";

// GET /api/internships/[id]/applicants - fetch applicants for an internship
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

    const applications = await Application.find({ internshipId })
      .populate("studentId", "name email stream institution designation isVerified")
      .sort({ createdAt: -1 });

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
          portfolio: portfolio ? {
            verifiedSkills: portfolio.verifiedSkills,
            certificates: portfolio.certificates,
            projects: portfolio.projects,
          } : null,
          evaluations,
          skillAssessment: lastAssessment ? {
            score: lastAssessment.score,
            percentage: lastAssessment.percentage,
            gapAnalysis: lastAssessment.gapAnalysis,
          } : null,
        };
      })
    );

    return NextResponse.json({ applicants: enriched });
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
    const body = await request.json();
    const { applicationId, status, feedbackNote } = body;

    const validation = ApplicationStatusSchema.safeParse({ status, feedbackNote });
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid status update" }, { status: 400 });
    }

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
