import { MathInput } from "@/lib/components/MathInput";
import { Form, Input, Typography } from "antd";
import { FormProps } from "antd/lib";
import { FC, useState } from "react";

interface Props {}

export const DynamicForm: FC<Props> = ({}) => {
  const [input, setInput] = useState<{ text: string }>({
    text: "$$ax^2 + bx + c = 0$$",
  });

  const onValuesChange: FormProps<{ text: string }>["onValuesChange"] = (
    _,
    values
  ) => {
    console.log("values change: ", values);
    setInput(values);
  };

  return (
    <div className="flex h-[600px] items-start justify-center overflow-y-auto">
      <div className="grid max-w-[700px] flex-1 grid-cols-2 grid-rows-1 ">
        <Form
          onValuesChange={onValuesChange}
          layout="vertical"
          className="pr-4"
          initialValues={{
            text: "$$ax^2 + bx + c = 0$$",
          }}
        >
          <div className="flex items-center justify-center">
            <Typography.Title level={3}>Input</Typography.Title>
          </div>
          <Form.Item name="text">
            <Input.TextArea rows={10} placeholder="Enter Equation" />
          </Form.Item>
        </Form>
        <div>
          <div className="flex items-center justify-center">
            <Typography.Title level={3}>Preview</Typography.Title>
          </div>
          <MathInput content={input.text} />
        </div>
      </div>
    </div>
  );
};
