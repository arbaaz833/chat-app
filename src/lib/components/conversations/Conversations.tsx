import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { ThunkStatus } from "@/lib/types/misc";
import { conversationsActions } from "@/modules/conversations/slice/conversations.slice";

import { Loading } from "@/common/components/loading/Loading";
import { FC, useEffect } from "react";
import { ConversationTile } from "./ConversationTile";

interface IProps {}

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
    if (conversations.length === 0) {
      dispatch(conversationsActions.getConversations(1));
    }
  }, []);

  return (
    <div>
      {searchLoading ? (
        <Loading />
      ) : showSearchResults ? (
        searchResults.length ? (
          searchResults.map((conversation) => {
            return (
              <ConversationTile
                key={conversation._id}
                conversation={conversation}
              />
            );
          })
        ) : (
          <div>
            <p className="text-center text-gray-500">No results found</p>
          </div>
        )
      ) : (
        <div>
          {conversations.map((conversation) => (
            <ConversationTile
              key={conversation._id}
              conversation={conversation}
            />
          ))}
          {conversationLoading && <Loading />}
        </div>
      )}
    </div>
  );
};
