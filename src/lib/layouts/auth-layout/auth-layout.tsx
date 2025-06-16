import React, { PropsWithChildren } from "react";
import EmptyLayout from "../empty-layout";

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <EmptyLayout className="grid place-items-center">{children}</EmptyLayout>
  );
};

export default AuthLayout;
