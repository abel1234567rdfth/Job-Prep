import { db } from "@/firebase/admin";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const interviewId = url.searchParams.get("interviewId");
    const userId = url.searchParams.get("userId");

    if (!interviewId || !userId) {
      return NextResponse.json(
        { error: "Missing interviewId or userId" },
        { status: 400 }
      );
    }

    const feedbackSnapshot = await db
      .collection("feedback")
      .where("interviewId", "==", interviewId)
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();

    if (feedbackSnapshot.empty) {
      return NextResponse.json(
        { error: "feedback not found" },
        { status: 404 }
      );
    }

    const feedbackDoc = feedbackSnapshot.docs[0];

    return NextResponse.json({
      id: feedbackDoc.id,
      ...feedbackDoc.data(),
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
