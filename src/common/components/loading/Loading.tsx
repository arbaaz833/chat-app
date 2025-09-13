import { Skeleton } from "antd";
import { FC } from "react";

interface Props {
  count?: number;
}

export const Loading: FC<Props> = ({ count }) => {
  return Array(count || 6)
    .fill(0)
    .map((_, index) => {
      return (
        <Skeleton
          key={index}
          className="mb-2"
          active
          title={false}
          paragraph={{ rows: 2 }}
        />
      );
    });
};
