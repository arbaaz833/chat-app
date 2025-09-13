import { PlusOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { FC, useState } from "react";

interface IProps {}

export const MessageInput: FC<IProps> = (props) => {
  const [message, setMessage] = useState<string>("");
  return (
    <div className="px-4 py-2 flex items-center justify-between gap-2">
      <PlusOutlined />
      <Input
        value={message}
        size="small"
        className="!bg-transparent"
        placeholder="Enter message"
        onChange={(e) => setMessage(e.target.value)}
        suffix={
          <Button
            type="text"
            shape="round"
            icon={<SendOutlined />}
            disabled={!message}
          />
        }
      />
    </div>
  );
};
