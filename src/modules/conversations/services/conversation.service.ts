import axios from "@/lib/axios.config";

const getConversations = async (page: number) => {
  return await axios.get(`/conversation/list?limit=15&page=${page}`);
};

const getConversation = async (id: string) => {
  return await axios.get(`/conversation/fetch/${id}`);
};

const searchConversations = async (query: string) => {
  return await axios.get("/conversation/search", {
    params: { name: query },
  });
};

export const conversationService = {
  getConversations,
  searchConversations,
  getConversation,
};
