import Agent from "@/components/agent";
import React from "react";

const prep = () => {
  return (
    <>
      <h3>Interview Generation</h3>
      <Agent userName="You" userId="user1" type="generate" />
    </>
  );
};

export default prep;
