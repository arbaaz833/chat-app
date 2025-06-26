import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { ThunkStatus } from "@/lib/types/misc";
import { conversationsActions } from "@/modules/conversations/slice/conversations.slice";
import { Skeleton } from "antd";
import { FC, useEffect } from "react";
import { ConversationTile } from "./ConversationTile";

interface IProps {}

const Loading: FC = () => {
  return Array(6)
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

export const Conversations: FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();
  const conversations = useAppSelector(
    (state) => state.conversations.conversations
  );
  const showSearchResults = useAppSelector(
    (state) => state.conversations.showSearchResults
  );
  const searchResults = useAppSelector(
    (state) => state.conversations.searchResults
  );
  const conversationLoading = useAppSelector(
    (state) =>
      state.conversations.getConversationsStatus === ThunkStatus.LOADING
  );
  const searchLoading = useAppSelector(
    (state) =>
      state.conversations.searchConversationsStatus === ThunkStatus.LOADING
  );

  useEffect(() => {
    dispatch(conversationsActions.getConversations(1));
    console.log("Fetching conversations...");
  }, []);

  return (
    <div>
      {searchLoading ? (
        <Loading />
      ) : showSearchResults ? (
        searchResults.map((conversation) => {
          return (
            <ConversationTile
              key={conversation._id}
              Conversation={conversation}
            />
          );
        })
      ) : (
        <div>
          {conversations.map((conversation) => (
            <ConversationTile
              key={conversation._id}
              Conversation={conversation}
            />
          ))}
          {conversationLoading && <Loading />}
        </div>
      )}
    </div>
  );
};
