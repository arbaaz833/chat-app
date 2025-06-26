import axios from "@/lib/axios.config";

const getConversations = async (page: number) => {
  return await axios.get(`/conversation/list?limit=15&page=${page}`);
};

const searchConversations = async (query: string) => {
  return await axios.get("/conversation/search", {
    params: { query },
  });
};

export const conversationService = {
  getConversations,
  searchConversations,
};
