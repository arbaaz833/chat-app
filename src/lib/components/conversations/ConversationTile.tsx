import ServerImg from "@/common/components/serverImg/serverImage";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { conversationsActions } from "@/modules/conversations/slice/conversations.slice";
import { Conversation } from "@/modules/conversations/types/conversation.type";
import useUrlState from "@ahooksjs/use-url-state";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FC, useMemo } from "react";

interface IProps {
  conversation: Conversation;
}

dayjs.extend(relativeTime);

export const ConversationTile: FC<IProps> = ({ conversation }) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [_, setQuery] = useUrlState();
  const name = useMemo(() => {
    if (conversation.groupName) return conversation.groupName;
    if (conversation.members.length) {
      const otherUser = conversation.members.find(
        (member) => member.id !== user?.id
      );
      return otherUser?.username;
    }
  }, []);

  const image = useMemo(() => {
    if (conversation.type === "group") return conversation.groupAvatar || null;
    else if (conversation.members.length) {
      const otherUser = conversation.members.find(
        (member) => member.id !== user?.id
      );
      return otherUser?.profilePicture || null;
    }
  }, []);

  const setActiveConversation = () => {
    setQuery({ conversationId: conversation._id });
    dispatch(conversationsActions.setSelectedConversation(conversation));
  };

  return (
    <div
      onClick={setActiveConversation}
      className="flex items-center gap-2 p-2 hover:bg-primary-100 hover:text-white transition-all cursor-pointer rounded-md"
    >
      <ServerImg
        src={image}
        style={{ width: "40px", height: "40px", borderRadius: "100%" }}
        preview={false}
      />
      <div className="flex flex-1 justify-between items-start">
        <span className="truncate">{name}</span>
        <span className="text-xs">
          {dayjs(conversation.updatedAt).fromNow()}
        </span>
      </div>
    </div>
  );
};
