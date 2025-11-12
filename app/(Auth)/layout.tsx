"use server";
import { isAuthenticated } from "@/lib/helper actions";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const Authlayout = async ({ children }: { children: React.ReactNode }) => {
  const isauthenticated = await isAuthenticated();

  if (isauthenticated) redirect("/");
  return <div className="auth-layout">{children}</div>;
};

export default Authlayout;
