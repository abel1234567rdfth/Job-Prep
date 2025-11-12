import { db } from "@/firebase/admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, email, name } = body;

    const userRecord = await db.collection("users").doc(userId).get();
    if (userRecord.exists) {
      return NextResponse.json({
        success: false,
        message: "User already exists.Please sign in",
      });
    }
    await db.collection("users").doc(userId).set({
      name,
      email,
    });
    return NextResponse.json({
      success: true,
      message: "Account created successfully. Please sign in.",
    });
  } catch (err: any) {
    console.error(err.message);
    if (err.code === "auth/email=already-exists") {
      return NextResponse.json({
        success: false,
        message: "User already exists.Please sign in",
      });
    }
    return NextResponse.json({
      success: false,
      message: "Failed to create an account ",
    });
  }
}
