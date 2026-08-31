import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { SkillAssessment } from "@/models/SkillAssessment";
import { Application } from "@/models/Application";
import { getAuthUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthUser(request);
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const studentId = authUser.userId;

    const assessments = await SkillAssessment.find({ studentId }).sort({ createdAt: 1 });
    const applications = await Application.find({ studentId });

    const statusCounts = {
      Applied: 0,
      Shortlisted: 0,
      "Under Review": 0,
      Selected: 0,
      Rejected: 0,
    };

    applications.forEach((app) => {
      if (statusCounts[app.status] !== undefined) {
        statusCounts[app.status] += 1;
      }
    });

    const scoresHistory = assessments.map((a) => ({
      date: new Date(a.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
      score: a.score,
      percentage: a.percentage,
      stream: a.stream,
    }));

    const latestAssessment = assessments[assessments.length - 1] || null;

    // Calculate readiness score
    const avgScore = assessments.length > 0
      ? Math.round(assessments.reduce((acc, curr) => acc + curr.percentage, 0) / assessments.length)
      : 70;

    const readinessIndex = Math.min(100, Math.round(avgScore * 0.7 + (applications.length > 0 ? 20 : 10) + 10));

    return NextResponse.json({
      statusCounts,
      totalApplications: applications.length,
      scoresHistory,
      latestAssessment,
      readinessIndex,
      assessmentsCount: assessments.length,
    });
  } catch (error: any) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
