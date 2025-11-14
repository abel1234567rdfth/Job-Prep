import { db } from "@/firebase/admin";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const courseId = url.searchParams.get("courseId");
    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    const course = await db.collection("courses").doc(courseId).get();
    if (!course.exists) {
      return NextResponse.json({ error: "course not found" }, { status: 404 });
    }
    return NextResponse.json(course.data());
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
