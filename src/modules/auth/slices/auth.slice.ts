import { RouterConfig } from "@/lib/router/router-config";
import { ThunkStatus } from "@/lib/types/misc";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import { User } from "../types/auth.type";

export const name = "auth";

//initial state
const initialState: {
  computedRoutes?: (RouterConfig & { key: string })[];
  sidebarCollapsed: boolean;
  status: "processing" | "authenticated" | "unauthenticated";
  loginStatus: ThunkStatus;
  logoutStatus: ThunkStatus;
  signupStatus?: ThunkStatus;
  user: undefined | User;
} = {
  computedRoutes: undefined,
  sidebarCollapsed: false,
  status: "processing",
  loginStatus: ThunkStatus.IDLE,
  signupStatus: ThunkStatus.IDLE,
  logoutStatus: ThunkStatus.IDLE,
  user: undefined,
};

const login = createAsyncThunk(
  `${name}/login`,
  async (data: Parameters<typeof authService.login>[0]) => {
    const res = await authService.login(data);
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    return res.data;
  }
);

const signup = createAsyncThunk(
  `${name}/signup`,
  async (data: Parameters<typeof authService.signup>[0]) => {
    await authService.signup(data);
  }
);

const logout = createAsyncThunk(`${name}/logout`, async () => {
  await authService.logout();
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
});

//slice
export const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    toggleSidebarCollapsed(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setComputedRoutes(state, action) {
      state.computedRoutes = action.payload;
    },
    setStatus(state, action: PayloadAction<(typeof initialState)["status"]>) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "authenticated";
      state.user = action.payload.user;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.status = "unauthenticated";
    });
  },
});

//action creators
export const authActions = { ...authSlice.actions, login, logout, signup };
