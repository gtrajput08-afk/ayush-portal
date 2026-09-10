import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Internship } from "@/models/Internship";
import { InternshipCreateSchema } from "@/lib/validations";
import { getAuthUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/internships - list all or filter by stream / search / location with pagination
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const stream = searchParams.get("stream");
    const query = searchParams.get("query");
    const state = searchParams.get("state");
    const status = searchParams.get("status") || "Active";

    // Pagination parameters (default: 20 per page)
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
    const skip = (page - 1) * limit;

    const filter: any = { status };

    if (stream && stream !== "All") {
      filter.$or = [{ stream }, { stream: "All" }];
    }

    if (state && state !== "All") {
      filter["location.state"] = { $regex: state, $options: "i" };
    }

    if (query) {
      filter.$and = [
        ...(filter.$and || []),
        {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { requiredSkills: { $regex: query, $options: "i" } },
          ],
        },
      ];
    }

    const [total, internships] = await Promise.all([
      Internship.countDocuments(filter),
      Internship.find(filter)
        .populate("postedBy", "name email role mentorType institution")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      internships,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error: any) {
    console.error("Fetch internships error:", error);
    return NextResponse.json({ error: "Failed to fetch internships" }, { status: 500 });
  }
}

// POST /api/internships - post internship (industry / academician)
export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthUser(request);
    if (!authUser || (authUser.role !== "industry" && authUser.role !== "academician")) {
      return NextResponse.json(
        { error: "Unauthorized. Only Industry and Academician roles can post opportunities." },
        { status: 403 }
      );
    }

    await connectToDatabase();
    const body = await request.json();

    const validation = InternshipCreateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const newInternship = await Internship.create({
      ...validation.data,
      postedBy: authUser.userId,
      status: "Active",
    });

    return NextResponse.json(
      { message: "Internship posted successfully", internship: newInternship },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create internship error:", error);
    return NextResponse.json({ error: error.message || "Failed to post internship" }, { status: 500 });
  }
}
