import Agent from "@/components/agent";
import { getCurrentUser } from "@/lib/helper actions";
import React from "react";

const Course = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <h3>Course Generation</h3>
      <Agent userName={user?.name!} userId={user?.id} type="generate course" />
    </>
  );
};

export default Course;
