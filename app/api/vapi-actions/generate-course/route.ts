import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { type, role, level, techstack, userid } = await request.json();

  try {
    //  Generate course from the AI model
    const { text: teaching } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare a full job interview preparation course spoken by a voice assistant.

This is extremely important:

Return ONLY the course. Do NOT add extra explanations.

Write the entire course as natural spoken narration.

Do NOT use ANY special characters, including:
asterisks
hash symbols
slashes
underscores
angle brackets
backticks
hyphens
colons
parentheses
quotation marks
dots used as bullet points
or any symbols that could be read aloud incorrectly.

Do NOT use markdown.

Do NOT use code examples.

Do NOT mention code terms like get server side props jsx api routes or frameworks unless absolutely necessary. If necessary, describe them in plain human language without naming file names or functions.

Write ONLY simple human speech.

Use short clear sentences.

Break the content into spoken modules using this exact format:
Module one. Title
Module two. Title
Never use colons.

Never use lists. Instead say things like:
Here are three things you should know.

Everything must be formatted as plain narration that a voice assistant can read naturally.

Role: ${role}
Experience level: ${level}
Tech stack: ${techstack}
Focus: ${type}

       
      `,
    });

    const course = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      course: teaching,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("courses").add(course);

    return NextResponse.json({ success: true, course }, { status: 200 });
  } catch (err: any) {
    console.error("Interview generation error:", err.message);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
