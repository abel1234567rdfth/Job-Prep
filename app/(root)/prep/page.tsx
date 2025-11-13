import Agent from "@/components/agent";
import { getCurrentUser } from "@/lib/helper actions";
import React from "react";

const prep = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <h3>Interview Generation</h3>
      <Agent userName={user?.name!} userId={user?.id} type="generate" />
    </>
  );
};

export default prep;
