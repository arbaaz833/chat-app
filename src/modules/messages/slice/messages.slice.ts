import { RootState } from "@/lib/redux/store";
import { ThunkStatus } from "@/lib/types/misc";
import { promiseWithRetry } from "@/lib/utils/misc.utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, uniqueId } from "lodash";
import { messageService } from "../services/messages.service";
import { Message } from "../types/messages.types";

export const name = "message";
const initialState: {
  messages: Message[] | [];
  getMessagesStatus?: ThunkStatus;
} = {
  messages: [],
  getMessagesStatus: ThunkStatus.IDLE,
};

export const getMessages = createAsyncThunk(
  `${name}/getMessages`,
  async (payload: { page: number; id: string }, { dispatch }) => {
    const response = await messageService.getMessages(payload);
    dispatch(messagesActions.setMessages(response.data.docs));
    return response.data.docs;
  }
);

export const sendMessage = createAsyncThunk(
  `${name}/sendMessage`,
  async (
    payload: Parameters<typeof messageService.sendMessage>[0],
    { dispatch, getState }
  ) => {
    const state = getState() as RootState;
    const id = uniqueId();
    const placeholderMessage: Message = {
      text: payload.message,
      sender: state.auth.user?.id!,
      conversation: payload.conversation || "",
      placeholder: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _id: id,
      media: payload.files
        ? payload.files.map((file) => URL.createObjectURL(file))
        : [],
    };
    dispatch(messagesActions.addNewMessage(placeholderMessage));
    await promiseWithRetry(
      () => messageService.sendMessage(payload),
      3,
      (message: Message) => messagesActions.updateMessage({ message, id })
    );
  }
);

export const messagesSlice = createSlice({
  name,
  initialState,
  reducers: {
    setMessages(state, action) {
      state.messages = [...action.payload, ...state.messages];
    },
    addNewMessage(state, action) {
      state.messages = [...state.messages, action.payload];
    },
    updateMessage(state, action) {
      const index = state.messages.findIndex(
        (message) => message._id === get(action.payload, "id")
      );
      if (index !== -1) {
        state.messages[index] = action.payload.message;
      }
    },
  },
});

export const messagesActions = {
  ...messagesSlice.actions,
  getMessages,
};
