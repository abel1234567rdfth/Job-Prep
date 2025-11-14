"use server";
import { isAuthenticated } from "@/lib/helper actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const Authlayout = async ({ children }: { children: React.ReactNode }) => {
  const isauthenticated = await isAuthenticated();

  if (isauthenticated) redirect("/");

  return (
    <div className="flex  justify-between">
      <div className="auth-layout">{children}</div>

      <Image
        src="/robot.webp"
        alt="onboarding"
        className="hidden lg:block"
        width={600}
        height={200}
      />
    </div>
  );
};

export default Authlayout;
