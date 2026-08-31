import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { FdpAndResearch } from "@/models/FdpAndResearch";
import { FdpCreateSchema } from "@/lib/validations";
import { getAuthUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const stream = searchParams.get("stream");

    const filter: any = {};
    if (type && type !== "All") filter.type = type;
    if (stream && stream !== "All") {
      filter.$or = [{ stream }, { stream: "All" }];
    }

    const items = await FdpAndResearch.find(filter)
      .populate("postedBy", "name email role mentorType institution")
      .sort({ createdAt: -1 });

    return NextResponse.json({ items });
  } catch (error: any) {
    console.error("Fetch FDP error:", error);
    return NextResponse.json({ error: "Failed to fetch FDP/Research opportunities" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthUser(request);
    if (!authUser || (authUser.role !== "academician" && authUser.role !== "industry")) {
      return NextResponse.json({ error: "Unauthorized. Only academicians or industry can post FDP/Research." }, { status: 403 });
    }

    await connectToDatabase();
    const body = await request.json();

    const validation = FdpCreateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Validation failed", details: validation.error.format() }, { status: 400 });
    }

    const item = await FdpAndResearch.create({
      ...validation.data,
      postedBy: authUser.userId,
      status: "Open",
    });

    return NextResponse.json({ message: "Posting published successfully", item }, { status: 201 });
  } catch (error: any) {
    console.error("Create FDP error:", error);
    return NextResponse.json({ error: "Failed to create posting" }, { status: 500 });
  }
}
