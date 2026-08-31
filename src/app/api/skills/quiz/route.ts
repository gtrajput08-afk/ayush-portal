import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { SkillAssessment } from "@/models/SkillAssessment";
import { DigitalPortfolio } from "@/models/DigitalPortfolio";
import { AYUSH_QUESTIONS, evaluateQuiz } from "@/lib/quizData";
import { QuizSubmitSchema } from "@/lib/validations";
import { getAuthUser } from "@/lib/auth";

// GET /api/skills/quiz - get questions for stream
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stream = (searchParams.get("stream") || "Ayurveda") as "Ayurveda" | "Yoga" | "Unani" | "Siddha" | "Homeopathy";

    const questions = AYUSH_QUESTIONS[stream] || AYUSH_QUESTIONS.Ayurveda;

    // Send without revealing correctOption in question payload for security
    const sanitizedQuestions = questions.map((q) => ({
      id: q.id,
      stream: q.stream,
      category: q.category,
      question: q.question,
      options: q.options,
    }));

    return NextResponse.json({ stream, questions: sanitizedQuestions });
  } catch (error: any) {
    console.error("Quiz fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch quiz" }, { status: 500 });
  }
}

// POST /api/skills/quiz - submit answers, calculate score & gap analysis
export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthUser(request);
    if (!authUser || authUser.role !== "student") {
      return NextResponse.json({ error: "Unauthorized. Student role required." }, { status: 403 });
    }

    await connectToDatabase();
    const body = await request.json();

    const validation = QuizSubmitSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid quiz submission", details: validation.error.format() }, { status: 400 });
    }

    const { stream, answers } = validation.data;
    const result = evaluateQuiz(stream, answers);

    // Save assessment to database
    const assessment = await SkillAssessment.create({
      studentId: authUser.userId,
      stream,
      score: result.score,
      totalQuestions: result.totalQuestions,
      percentage: result.percentage,
      answers: result.answers,
      gapAnalysis: result.gapAnalysis,
    });

    // Update student portfolio with verified skill badge if score >= 60%
    const badgeLevel = result.percentage >= 85 ? "Gold" : result.percentage >= 60 ? "Silver" : "Bronze";
    const skillLevel = result.percentage >= 85 ? "Advanced" : result.percentage >= 60 ? "Intermediate" : "Beginner";

    await DigitalPortfolio.findOneAndUpdate(
      { studentId: authUser.userId },
      {
        $push: {
          verifiedSkills: {
            name: `${stream} Assessment (${result.percentage}%)`,
            category: "Diagnostic & Core Competency",
            level: skillLevel,
            verifiedBy: "AYUSH National Assessment Engine",
            verifiedDate: new Date(),
            badge: badgeLevel,
          },
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      message: "Assessment completed successfully!",
      assessmentId: assessment._id,
      score: result.score,
      totalQuestions: result.totalQuestions,
      percentage: result.percentage,
      answers: result.answers,
      gapAnalysis: result.gapAnalysis,
    });
  } catch (error: any) {
    console.error("Quiz submission error:", error);
    return NextResponse.json({ error: "Failed to evaluate assessment" }, { status: 500 });
  }
}
