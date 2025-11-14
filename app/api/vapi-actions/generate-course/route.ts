import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { type, role, level, techstack, userid } = await request.json();

  try {
    //  Generate course from the AI model
    const { text: topics } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `
Prepare Topics to study  for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical Topics to study  should lean towards: ${type}.
        Please return only the Topics to study , without any additional text.
        The Topics to study  are going to be read by a voice assistant so do not use "/" or "*" or any other special characters.
        Return the Topics to study  formatted like this:
        ["Topic 1", "Topic 2", "Topic 3"]
  `,
    });
    let parsedTopics: string[];
    try {
      parsedTopics = JSON.parse(topics);
    } catch {
      console.error("AI returned malformed JSON:", topics);
      return NextResponse.json(
        { success: false, message: "Invalid topic format" },
        { status: 400 }
      );
    }

    const course = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      course: parsedTopics,
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
