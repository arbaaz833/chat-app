import ServerImg from "@/common/components/serverImg/serverImage";
import { useAppSelector } from "@/lib/redux/store";
import { Conversation } from "@/modules/conversations/types/conversation.type";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FC, useMemo } from "react";

interface IProps {
  Conversation: Conversation;
}

dayjs.extend(relativeTime);

export const ConversationTile: FC<IProps> = ({ Conversation }) => {
  const user = useAppSelector((state) => state.auth.user);

  const name = useMemo(() => {
    if (Conversation.groupName) return Conversation.groupName;
    if (Conversation.members.length) {
      const otherUser = Conversation.members.find(
        (member) => member.id !== user?.id
      );
      return otherUser?.username;
    }
  }, []);

  const image = useMemo(() => {
    if (Conversation.type === "group") return Conversation.groupAvatar || null;
    else if (Conversation.members.length) {
      const otherUser = Conversation.members.find(
        (member) => member.id !== user?.id
      );
      return otherUser?.profilePicture || null;
    }
  }, []);

  return (
    <div className="flex items-center gap-2 p-2 hover:bg-primary-100 hover:text-white transition-all cursor-pointer rounded-md">
      <ServerImg
        src={image}
        style={{ width: "40px", height: "40px", borderRadius: "100%" }}
        preview={false}
      />
      <div className="flex flex-1 justify-between items-start">
        <span className="truncate">{name}</span>
        <span className="text-xs">
          {dayjs(Conversation.updatedAt).fromNow()}
        </span>
      </div>
    </div>
  );
};
