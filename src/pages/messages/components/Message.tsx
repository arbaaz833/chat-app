import { useAppSelector } from "@/lib/redux/store";
import { Message } from "@/modules/messages/types/messages.types";
import dayjs from "dayjs";
import { FC } from "react";
import { IoCheckmarkDone, IoTimeOutline } from "react-icons/io5";

interface IProps {
  message: Message;
}

export const RenderMessage: FC<IProps> = ({ message }) => {
  const userId = useAppSelector((state) => state.auth.user?.id);

  return (
    <div
      className={`flex items-center ${message.sender === userId ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`p-2 rounded-md max-w-[60%] ${message.sender === userId ? "bg-primary-400 text-white" : "bg-primary-100 text-black"}`}
      >
        <span>{message.text}</span>
        <div className="flex items-center justify-end gap-1">
          <span className="text-[10px]">
            {dayjs(message.createdAt).format("hh:mm:ss A")}
          </span>
          {message.placeholder ? <IoTimeOutline /> : <IoCheckmarkDone />}
        </div>
      </div>
    </div>
  );
};
