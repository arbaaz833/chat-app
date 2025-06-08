import { Heading } from "@/lib/components/heading/Heading";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { FC } from "react";
import { DynamicForm } from "./components/DynamicForm";

type Props = {};

export const Preview: FC<Props> = ({}) => {
  return (
    <div className="px-4 h-full overflow-y-hidden">
      <Heading heading="Pretty Math Equation">
        <Tooltip title="Download sample equations">
          <a download target="_blank" href="/sample-latex-equations.pdf">
            <Button icon={<DownloadOutlined />} type="primary" />
          </a>
        </Tooltip>
      </Heading>
      <DynamicForm />
    </div>
  );
};
