import React, { ReactNode } from "react";

const Authlayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="auth-layout">{children}</div>;
};

export default Authlayout;
