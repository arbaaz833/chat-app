import { ThunkStatus } from "@/lib/types/misc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { conversationService } from "../services/conversation.service";
import { Conversation } from "../types/conversation.type";

export const name = "conversations";

const initialState: {
  conversations: Conversation[] | [];
  selectedConversation: Conversation | null;
  searchResults: Conversation[] | [];
  showSearchResults?: boolean;
  getConversationsStatus: ThunkStatus;
  searchConversationsStatus: ThunkStatus;
} = {
  conversations: [],
  selectedConversation: null,
  searchResults: [],
  showSearchResults: false,
  getConversationsStatus: ThunkStatus.IDLE,
  searchConversationsStatus: ThunkStatus.IDLE,
};

const getConversations = createAsyncThunk(
  `${name}/getConversations`,
  async (page: number) => {
    const response = await conversationService.getConversations(page);

    return response.data.docs;
  }
);

const getConversation = createAsyncThunk(
  `${name}/getConversation`,
  async (id: string, { dispatch }) => {
    const response = await conversationService.getConversation(id);
    console.log("response: ", response.data);
    dispatch(conversationsActions.setSelectedConversation(response.data));
  }
);

const searchConversations = createAsyncThunk(
  `${name}/searchConversations`,
  async (query: string) => {
    const response = await conversationService.searchConversations(query);
    return response.data;
  }
);

export const conversationsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setShowResults(state, action) {
      state.showSearchResults = action.payload;
    },
    setSelectedConversation(state, action) {
      state.selectedConversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getConversations.fulfilled, (state, action) => {
      state.conversations = [...state.conversations, ...action.payload];
    });
    builder.addCase(searchConversations.fulfilled, (state, action) => {
      state.searchResults = action.payload;
    });
  },
});

export const conversationsActions = {
  ...conversationsSlice.actions,
  getConversations,
  searchConversations,
  getConversation,
};
