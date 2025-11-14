import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import { getCurrentUser } from "@/lib/helper actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const user = await getCurrentUser();
  const [userInterviews, otherInterviews] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-actions/get-user-interviews?userId=${user?.id}`,
      { cache: "no-cache" }
    ).then((res) => res.json()),
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-actions/get-other-interviews?userId=${user?.id}`,
      { cache: "no-cache" }
    ).then((res) => res.json()),
  ]);
  console.log(otherInterviews, userInterviews);

  const hasPastInterviews = userInterviews.length > 0;
  const hasUpcoingInterviews = otherInterviews.length > 0;
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Job-Ready with AI-powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice on real job questions & get instant feedback
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="btn-primary max-sm:w-full">
              <Link href={"/prep"}>Start an Interview</Link>
            </Button>
            <Button asChild className="btn-primary max-sm:w-full">
              <Link href={"/course"}>Start a Course</Link>
            </Button>
          </div>
        </div>
        <Image
          src={"/robot.png"}
          alt="robot"
          width={400}
          height={400}
          className="hidden sm:block"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Courses</h2>
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews.map((interview: Interview) => (
              <InterviewCard {...interview} key={interview.id} type="course" />
            ))
          ) : (
            <p>You haven't taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Preps</h2>
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews.map((interview: Interview) => (
              <InterviewCard
                {...interview}
                key={interview.id}
                type="interview"
              />
            ))
          ) : (
            <p>You haven't taken any interviews yet</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Other People's Preps</h2>
        <div className="interviews-section">
          {hasUpcoingInterviews ? (
            otherInterviews.map((interview: Interview) => (
              <InterviewCard
                {...interview}
                key={interview.id}
                type="interview"
              />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
