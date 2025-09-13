import { Loading } from "@/common/components/loading/Loading";
import ServerImg from "@/common/components/serverImg/serverImage";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Actions } from "@/lib/types/misc";
import { debounced } from "@/lib/utils/misc.utils";
import { conversationsActions } from "@/modules/conversations/slice/conversations.slice";
import { messagesActions } from "@/modules/messages/slice/messages.slice";
import useUrlState from "@ahooksjs/use-url-state";
import { DownCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import dayjs from "dayjs";
import {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { RenderMessage } from "./components/Message";
import { MessageInput } from "./components/MessageInput";

type Props = {};

export const Conversation: FC<Props> = ({}) => {
  const [query] = useUrlState();
  const user = useAppSelector((state) => state.auth.user);
  const [online, setOnline] = useState(false);
  const dispatch = useAppDispatch();
  const chatSocket = useRef<Socket>();
  const [isScrolled, setIsScrolled] = useState(false);
  const MsgContainer = useRef<HTMLDivElement>(null);
  const [lastSeen, setLastSeen] = useState<string>();
  const conversation = useAppSelector(
    (state) => state.conversations.selectedConversation!
  );
  const messages = useAppSelector((state) => state.message.messages);
  const loading = useAppSelector(
    (state) => state.message.getMessagesStatus === "loading"
  );
  const conversationId = query?.conversationId as string;

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:3001", {
        auth: {
          id: user.id,
        },
      });
      socket.on("connect", () => {
        console.log("Connected to socket server");
      });
      chatSocket.current = socket;
    }
  }, [user]);

  useLayoutEffect(() => {
    const container = MsgContainer.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
      container.addEventListener("scroll", debounced(handleScroll, 300));
    }
  }, []);

  useEffect(() => {
    const socket = chatSocket.current;
    if (conversationId && !conversation) {
      dispatch(conversationsActions.getConversation(conversationId));
    }
    return () => {
      if (conversationId && socket) {
        socket.emit(Actions.LEAVE_ROOM, conversationId);
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const socket = chatSocket.current;
    if (!socket) return;

    if (conversationId && conversation) {
      if (conversation.type === "chat") {
        setLastSeen(
          conversation.members.find((member) => member.id !== user?.id)
            ?.lastSeen
        );
      }
      dispatch(messagesActions.getMessages({ id: conversationId, page: 1 }));
      socket.emit(Actions.JOIN_ROOM, conversationId);
      socket.on(Actions.NEW_MESSAGE, (message) => {
        console.log("New message received: ", message);
      });
      socket.on(Actions.USER_ONLINE, (userId) => {
        if (userId !== user?.id && conversation.type !== "group")
          setOnline(true);
      });
      socket.on(Actions.USER_OFFLINE, (userId) => {
        if (userId !== user?.id && conversation.type !== "group") {
          console.log("user went offline: ");
          setOnline(false);
          setLastSeen(new Date().toISOString());
        }
      });
    }
  }, [conversationId, conversation]);

  const name = useMemo(() => {
    if (!conversation) return "";
    if (conversation.groupName) return conversation.groupName;
    if (conversation.members.length) {
      const otherUser = conversation.members.find(
        (member) => member.id !== user?.id
      );
      return otherUser?.username;
    }
  }, [conversation]);

  const handleScroll = useCallback((e: WheelEvent) => {
    let page = 1;
    return () => {
      const target = e.target as HTMLDivElement;
      if (target.scrollTop !== target.scrollHeight) setIsScrolled(true);
      if (target.scrollTop === 10) {
        dispatch(messagesActions.getMessages({ id: conversationId, page }));
        page += 1;
      }
    };
  }, []);

  const moveDown = useCallback(() => {
    const container = MsgContainer.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
      setIsScrolled(false);
    }
  }, []);

  const image = useMemo(() => {
    if (!conversation) return;
    if (conversation.type === "group") return conversation.groupAvatar || null;
    else if (conversation.members.length) {
      const otherUser = conversation.members.find(
        (member) => member.id !== user?.id
      );
      return otherUser?.profilePicture || null;
    }
  }, [conversation]);

  // const lastSeen = useMemo(() => {
  //   if (conversation.type === "group") return null;
  //   const otherUser = conversation.members.find(
  //     (member) => member.id !== user?.id
  //   );
  //   return otherUser?.lastSeen;
  // }, []);

  const status = useMemo(() => {
    console.log("lastSeen: ", lastSeen);
    if (online) return "Online";
    else if (lastSeen)
      return `Last seen on ${dayjs(lastSeen).format("hh:mm A")}`;
    else return null;
  }, [online, lastSeen]);

  return (
    <>
      {conversationId && conversation ? (
        <div>
          <div className="h-16 bg-background">
            <div className=" h-full flex items-center gap-2">
              <ServerImg
                src={image}
                style={{ width: "40px", height: "40px", borderRadius: "100%" }}
                preview={false}
              />
              <div className="flex flex-col justify-start items-center gap-2">
                <div>{name}</div>
                <div className="text-xs text-gray-500">
                  {conversation.type === "group"
                    ? conversation.members.map((member) => (
                        <span>{member.username}</span>
                      ))
                    : status}
                </div>
              </div>
            </div>
          </div>
          <div className="h-[calc(100vh-64px)] flex flex-col">
            <div className="relative flex-1 flex flex-col overflow-y-scroll">
              {loading && messages.length ? (
                <div className="flex items-center justify-center">
                  <Spin
                    indicator={
                      <LoadingOutlined spin className="text-primary-500" />
                    }
                  />
                </div>
              ) : loading && messages.length === 0 ? (
                <div className="flex flex-col">
                  <Loading />
                </div>
              ) : messages.length ? (
                messages.map((message) => {
                  return <RenderMessage message={message} key={message._id} />;
                })
              ) : (
                <p className="text-gray-500 text-center mt-4">
                  Start conversation
                </p>
              )}
              {isScrolled && (
                <Button
                  shape="round"
                  icon={<DownCircleOutlined />}
                  onClick={moveDown}
                  className="fixed right-1 bottom-1"
                ></Button>
              )}
            </div>
            <MessageInput />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-gray-500">No conversation selected</p>
        </div>
      )}
    </>
  );
};
