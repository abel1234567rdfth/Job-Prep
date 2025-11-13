import Agent from "@/components/agent";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import { getCurrentUser } from "@/lib/helper actions";
import { getRandomInterviewCover } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const interview = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-actions/get-interview-by-id?interviewId=${id}`,
    { cache: "no-cache" }
  );
  const interview = await res.json();
  if (!interview) redirect("/");

  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-col gap-4 items-center sm:flex-row">
          <div className="flex gap-4">
            <Image
              src={getRandomInterviewCover()}
              alt="Cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-10"
            />
            <h3 className="capitalized">{interview.role}</h3>
          </div>
          <DisplayTechIcons techStack={interview.techstack} />
        </div>
        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize">
          {interview.type}
        </p>
      </div>

      <Agent
        userName={user?.name!}
        type="interview"
        interviewId={id}
        userId={user?.id}
        questions={interview.questions}
      />
    </>
  );
};

export default interview;
