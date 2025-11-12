import { auth } from "@/firebase/admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, idToken } = body;

    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return NextResponse.json({
        success: false,
        message: "user does not exist.Create an account instead ",
      });
    }
    await setSessionCookie(idToken);

    return NextResponse.json({
      success: true,
      message: "Signed in successfully.",
    });
  } catch (err: any) {
    console.error(err.message);
  }
}

export async function setSessionCookie(idToken: string) {
  try {
    const ONE_WEEK = 60 * 60 * 24 * 7 * 1000;

    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: ONE_WEEK,
    });

    cookieStore.set("session", sessionCookie, {
      maxAge: ONE_WEEK,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });
  } catch (err: any) {
    console.error(err.message);
  }
}

// write sisgn in post api use the setcookie function here
