import { dbconnect } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "../auth/[...nextauth]/authConfig";

export async function POST(req: NextRequest) {
  const prisma = await dbconnect();
  const session = await getServerSession(authConfig);

  try {
    const { summary }: { summary: string } = await req.json();
    if (!summary) {
      return NextResponse.json(
        { error: "Summary is required" },
        { status: 400 }
      );
    }

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
    });
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const createdSummary = await prisma.summary.create({
      data: {
        content: summary,
        userId: existingUser.id,
      },
    });

    console.log("Created summary:", createdSummary.id);
    return NextResponse.json({ data: createdSummary }, { status: 201 });
  } catch (error) {
    console.error(
      "Error creating summary:",
      error instanceof Error ? error.message : String(error)
    );
    return NextResponse.json(
      { error: "An error occurred while creating summary" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const prisma = await dbconnect();
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
    });
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const summaries = await prisma.summary.findMany({
      where: {
        userId: existingUser.id,
      },
    });

    return NextResponse.json({ data: summaries });
  } catch (error) {
    console.error(
      "Error fetching summaries:",
      error instanceof Error ? error.message : String(error)
    );
    return NextResponse.json(
      { error: "An error occurred while fetching summaries" },
      { status: 500 }
    );
  }
}
