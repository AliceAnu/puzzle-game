import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/* -----------------------------------
   ✅ GET = Fetch all scores for user
----------------------------------- */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // ✅ Find User
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // ✅ Fetch Scores
    const scores = await prisma.dailyScore.findMany({
      where: { userId: user.id },
      orderBy: { date: "asc" },
    });

    return NextResponse.json({ scores });
  } catch (error) {
    console.error("Scores Fetch Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch scores" },
      { status: 500 }
    );
  }
}
