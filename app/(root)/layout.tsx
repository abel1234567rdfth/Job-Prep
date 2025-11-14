import { isAuthenticated } from "@/lib/helper actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const isauthenticated = await isAuthenticated();
  if (!isauthenticated) redirect("/signIn");

  return (
    <div className="root-layout">
      <nav>
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src={"/Logo.png"}
            alt="Logo"
            className="rounded-full"
            width={150}
            height={150}
          />
          <h2 className="text-primary-100 -ml-12">PrepWise</h2>
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
