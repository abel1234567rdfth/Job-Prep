import { db } from "@/firebase/admin";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const interviewId = url.searchParams.get("interviewId");
    if (!interviewId) {
      return NextResponse.json(
        { error: "Missing interviewId" },
        { status: 400 }
      );
    }

    const interview = await db.collection("interviews").doc(interviewId).get();
    if (!interview.exists) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(interview.data());
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
