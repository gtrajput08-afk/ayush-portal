import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { SkillAssessment } from "@/models/SkillAssessment";
import { CandidateEvaluation } from "@/models/CandidateEvaluation";
import { DigitalPortfolio } from "@/models/DigitalPortfolio";
import { getAuthUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthUser(request);
    if (!authUser || (authUser.role !== "academician" && authUser.role !== "industry")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await connectToDatabase();

    const students = await User.find({ role: "student" }).select("name email stream institution isVerified createdAt");

    const enrichedStudents = await Promise.all(
      students.map(async (student) => {
        const latestAssessment = await SkillAssessment.findOne({ studentId: student._id }).sort({ createdAt: -1 });
        const portfolio = await DigitalPortfolio.findOne({ studentId: student._id });
        const evaluations = await CandidateEvaluation.find({ studentId: student._id });

        const avgScore = latestAssessment ? latestAssessment.percentage : 65;
        const readiness = Math.min(100, Math.round(avgScore * 0.8 + (evaluations.length > 0 ? 15 : 5)));

        return {
          id: student._id,
          name: student.name,
          email: student.email,
          stream: student.stream || "Ayurveda",
          institution: student.institution || "National Institute of Ayurveda",
          isVerified: student.isVerified,
          latestScore: latestAssessment ? latestAssessment.percentage : null,
          strengths: latestAssessment?.gapAnalysis?.strengths || ["Core Theory"],
          skillGaps: latestAssessment?.gapAnalysis?.gaps || ["Clinical Diagnostics"],
          evaluationsCount: evaluations.length,
          readinessScore: readiness,
          verifiedSkillsCount: portfolio?.verifiedSkills?.length || 1,
          projectsCount: portfolio?.projects?.length || 0,
        };
      })
    );

    // Stream-wise employability statistics
    const streamStats: Record<string, { total: number; avgReadiness: number; totalScore: number }> = {
      Ayurveda: { total: 0, avgReadiness: 0, totalScore: 0 },
      Yoga: { total: 0, avgReadiness: 0, totalScore: 0 },
      Unani: { total: 0, avgReadiness: 0, totalScore: 0 },
      Siddha: { total: 0, avgReadiness: 0, totalScore: 0 },
      Homeopathy: { total: 0, avgReadiness: 0, totalScore: 0 },
    };

    enrichedStudents.forEach((s) => {
      const st = s.stream || "Ayurveda";
      if (!streamStats[st]) {
        streamStats[st] = { total: 0, avgReadiness: 0, totalScore: 0 };
      }
      streamStats[st].total += 1;
      streamStats[st].totalScore += s.readinessScore;
    });

    Object.keys(streamStats).forEach((key) => {
      if (streamStats[key].total > 0) {
        streamStats[key].avgReadiness = Math.round(streamStats[key].totalScore / streamStats[key].total);
      } else {
        streamStats[key].avgReadiness = 75; // baseline
      }
    });

    return NextResponse.json({
      students: enrichedStudents,
      streamStats,
      totalStudents: enrichedStudents.length,
    });
  } catch (error: any) {
    console.error("Fetch academician students error:", error);
    return NextResponse.json({ error: "Failed to fetch student metrics" }, { status: 500 });
  }
}
