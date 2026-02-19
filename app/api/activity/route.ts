import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/* -------------------------------
   ✅ POST → Save Daily Score
-------------------------------- */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, date, solved, score, timeTaken, difficulty } = body;

    if (!email || !date) {
      return NextResponse.json(
        { error: "Email and date are required" },
        { status: 400 }
      );
    }

    // ✅ Find User
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found. Save user first." },
        { status: 404 }
      );
    }

    // ✅ Upsert Score (Update if already exists)
    const dailyScore = await prisma.dailyScore.upsert({
      where: {
        userId_date: {
          userId: user.id,
          date: String(date),
        },
      },
      update: {
        solved,
        score,
        timeTaken,
        difficulty,
      },
      create: {
        userId: user.id,
        date: String(date),
        solved,
        score,
        timeTaken,
        difficulty,
      },
    });

    return NextResponse.json({ dailyScore });
  } catch (error) {
    console.error("Activity POST Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

/* -------------------------------
   ✅ GET → Fetch Scores (Realtime)
-------------------------------- */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const scores = await prisma.dailyScore.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ scores });
  } catch (error) {
    console.error("Activity GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch scores" },
      { status: 500 }
    );
  }
}
