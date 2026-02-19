import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch all users
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Fetch all daily scores
    const scores = await prisma.dailyScore.findMany({
      include: {
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      users,
      scores,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Admin Data Fetch Failed" },
      { status: 500 }
    );
  }
}
