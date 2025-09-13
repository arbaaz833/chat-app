import axios from "@/lib/axios.config";
import { objectToFormData } from "@/lib/utils/misc.utils";

const getMessages = async (payload: { page: number; id: string }) => {
  return await axios.get(
    `/message/list/${payload.id}?limit=15&page=${payload.page}`
  );
};

const searchConversations = async (query: string) => {
  return await axios.get("/conversation/search", {
    params: { name: query },
  });
};

const sendMessage = async (payload: {
  message: string;
  conversation?: string;
  files?: File[];
}) => {
  const id = payload.conversation;
  delete payload.conversation;
  const data = objectToFormData(payload);
  return await axios.post(`/message/create/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const messageService = {
  getMessages,
  searchConversations,
  sendMessage,
};
