import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { CandidateEvaluation } from "@/models/CandidateEvaluation";
import { User } from "@/models/User";
import { CandidateEvaluationSchema } from "@/lib/validations";
import { getAuthUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthUser(request);
    if (!authUser || (authUser.role !== "academician" && authUser.role !== "industry")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await connectToDatabase();

    const evaluations = await CandidateEvaluation.find({ evaluatorId: authUser.userId })
      .populate("studentId", "name email stream institution")
      .sort({ createdAt: -1 });

    return NextResponse.json({ evaluations });
  } catch (error: any) {
    console.error("Fetch evaluations error:", error);
    return NextResponse.json({ error: "Failed to fetch evaluations" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthUser(request);
    if (!authUser || (authUser.role !== "academician" && authUser.role !== "industry")) {
      return NextResponse.json({ error: "Unauthorized. Mentor evaluation privilege required." }, { status: 403 });
    }

    await connectToDatabase();
    const body = await request.json();

    const validation = CandidateEvaluationSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Validation failed", details: validation.error.format() }, { status: 400 });
    }

    const { studentId, problemSolving, communication, curiosity, practicalInstincts, hiddenGemsNotes, projectsBuiltReview, overallVerdict } = validation.data;

    const student = await User.findById(studentId);
    if (!student || student.role !== "student") {
      return NextResponse.json({ error: "Invalid student selected" }, { status: 404 });
    }

    const evaluation = await CandidateEvaluation.create({
      studentId,
      evaluatorId: authUser.userId,
      mentorType: authUser.mentorType || "external",
      problemSolving,
      communication,
      curiosity,
      practicalInstincts,
      hiddenGemsNotes,
      projectsBuiltReview: projectsBuiltReview || "",
      overallVerdict,
    });

    return NextResponse.json({
      message: "Candidate qualitative evaluation saved successfully!",
      evaluation,
    }, { status: 201 });
  } catch (error: any) {
    console.error("Submit evaluation error:", error);
    return NextResponse.json({ error: "Failed to save evaluation" }, { status: 500 });
  }
}
