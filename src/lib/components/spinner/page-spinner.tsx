import { Spin } from "antd";
import React from "react";
import { cn } from "../../../lib/utils/styles.utils";
import Center from "../center";

type Props = Partial<React.ComponentProps<typeof Center>> & {
  spinnerProps?: React.ComponentProps<typeof Spin>;
};

const PageSpinner: React.FC<Props> = ({ spinnerProps, ...props }) => {
  return (
    <Center {...props} className={cn("h-full", props.className)}>
      <Spin size="large" {...spinnerProps} />
    </Center>
  );
};

export default PageSpinner;
