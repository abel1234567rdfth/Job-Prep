import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    // 1️⃣ Generate questions from the AI model
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
      `,
    });

    // 2️⃣ Safely parse questions
    let parsedQuestions: string[];
    try {
      parsedQuestions = JSON.parse(questions);
    } catch {
      console.error("AI returned malformed JSON:", questions);
      return NextResponse.json(
        { success: false, message: "Invalid question format" },
        { status: 400 }
      );
    }

    // 3️⃣ Create interview object
    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: parsedQuestions,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    // 4️⃣ Store in Firestore
    await db.collection("interviews").add(interview);

    // 5️⃣ Return success response
    return NextResponse.json({ success: true, interview }, { status: 200 });
  } catch (err: any) {
    console.error("Interview generation error:", err.message);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
