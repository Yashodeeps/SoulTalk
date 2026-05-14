import { dbconnect } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { authConfig } from "../auth/[...nextauth]/authConfig";

export async function POST(req: NextRequest) {
  const prisma = await dbconnect();
  const session = await getServerSession(authConfig);

  try {
    const { conversation }: { conversation: string } = await req.json();
    if (!conversation || !conversation.trim()) {
      return NextResponse.json(
        { error: "Conversation is required" },
        { status: 400 }
      );
    }

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: { email: session.user.email },
    });
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You summarize therapy conversations in the third person, in under 300 words. Capture the user's key takeaways and current mental-health status.",
        },
        {
          role: "user",
          content: `Here is the conversation between the user and the AI therapist:\n\n${conversation}`,
        },
      ],
    });

    const summary = completion.choices[0]?.message?.content?.trim();
    if (!summary) {
      return NextResponse.json(
        { error: "Failed to generate summary" },
        { status: 502 }
      );
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
