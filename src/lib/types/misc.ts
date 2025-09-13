import { GlobalToken } from "antd";

export type JSSTheme = GlobalToken & { isDark: boolean };

export enum ThunkStatus {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}

export enum Actions {
  NEW_MESSAGE = "new-message",
  JOIN_ROOM = "join-room",
  LEAVE_ROOM = "leave-room",
  USER_ONLINE = "user-online",
  USER_OFFLINE = "user-offline",
}

export type GenericObject = Record<string, any>;
export type KeyValuePair = Record<string, string>;
