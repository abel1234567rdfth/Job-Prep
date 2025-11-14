import React from "react";

import dayjs from "dayjs";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import DisplayTechIcons from "./DisplayTechIcons";
import { getCurrentUser } from "@/lib/helper actions";

const InterviewCard = async ({
  id,
  userId,
  role,
  techstack,
  createdAt,
  type,
  variant,
  courseId,
}: InterviewCardCourseProps) => {
  const user = await getCurrentUser();

  const res2 = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-actions/get-feedback?interviewId=${id}&userId=${user?.id}`,
    { cache: "no-cache" }
  );

  const feedback = await res2.json();
  console.log(userId, id);
  console.log(feedback);

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formatDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D,YYYY");
  return (
    <div className="card-border  w-full sm:w-[360px] min-h-96">
      <div className="card-interview ">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
            <p className="badge-text">
              {variant === "course" ? "Course" : normalizedType}
            </p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="cover image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />

          <h3 className="mt-5 capitalize">{role} Interview</h3>

          <div className="flex  gap-5 mt-3">
            <div className="flex  gap-2">
              <Image
                src={"/calendar.svg"}
                alt="calendar"
                width={22}
                height={22}
              />
              <p>{formatDate}</p>
            </div>

            <div className="flex gap-2">
              {variant === "course" && (
                <>
                  <Image src={"/star.svg"} alt="star" width={22} height={22} />
                  <Image src={"/star.svg"} alt="star" width={22} height={22} />
                </>
              )}
              <Image src={"/star.svg"} alt="star" width={22} height={22} />
              <p>
                {variant === "course"
                  ? ""
                  : `${feedback?.totalScore || "---"}/100`}
              </p>
            </div>
          </div>
          {variant === "course" ? (
            <p className="line-clamp-2 mt-2">
              Explore the contents of the course in order to get ready and ace
              your interviews
            </p>
          ) : (
            <p className="line-clamp-2">
              {feedback
                ? feedback?.finalAssessment
                : "you haven't taken the interview yet.Take it to improve your skills."}
            </p>
          )}
        </div>
        <div className="flex justify-between">
          <DisplayTechIcons techStack={techstack} />
          {variant === "course" ? (
            <Button className="btn-primary">
              <Link href={`/course/${courseId}`}>View Course</Link>
            </Button>
          ) : (
            <Button className="btn-primary">
              <Link href={feedback ? `/prep/${id}/feedback` : `/prep/${id}`}>
                {feedback ? "Check Feedback" : "View"}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
