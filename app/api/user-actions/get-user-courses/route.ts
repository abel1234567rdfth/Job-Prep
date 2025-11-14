import { db } from "@/firebase/admin";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const snapshot = await db
      .collection("courses")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    const courses = snapshot.docs.map((doc) => ({
      courseId: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(courses);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
