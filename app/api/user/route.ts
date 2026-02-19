import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, photoUrl } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // ✅ Create user if not exists
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        photoUrl,
      },
      create: {
        email,
        name,
        photoUrl,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("User API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
