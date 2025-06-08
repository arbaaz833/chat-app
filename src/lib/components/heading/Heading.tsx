import { Typography } from "antd";
import React, { ReactNode } from "react";

interface HeadingProps {
  children?: ReactNode;
  heading: string;
}

export const Heading: React.FC<HeadingProps> = ({ children, heading }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <Typography.Title level={2}>{heading}</Typography.Title>
      {children}
    </div>
  );
};
