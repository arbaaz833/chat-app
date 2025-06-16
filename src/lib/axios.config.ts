import AlertPopup from "@/common/components/alert-popup/alert-popup";
import { getErrorMessage, globalErrorHandler } from "@/lib/utils/error.utils";
import authService from "@/modules/auth/services/auth.service";
import axiosApi from "axios";
import { isObject } from "lodash";

export const PERMISSION_ERR_MSG =
  "You don't have permission to perform this action. Please contact your organization admin.";

const axios = axiosApi.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((reqConfig) => {
  const token = localStorage.getItem("accessToken");
  if (token && !reqConfig.headers.Authorization) {
    reqConfig.headers.Authorization = `Bearer ${token}`;
  }
  return reqConfig;
});

axios.interceptors.response.use(
  async (response) => {
    const { data } = response;

    // deep convert all UTC dats to local
    if (data && isObject(data))
      response.data = JSON.parse(JSON.stringify(data), (k, v) => {
        return ["created_at", "updated_at"].includes(k) &&
          typeof v === "string" &&
          !v.endsWith("Z")
          ? v + "Z"
          : v;
      });
    return response.data;
  },
  async (error) => {
    try {
      if (error.response?.status === 403 && error.config.method !== "get") {
        AlertPopup({
          title: "Permission Denied",
          message: PERMISSION_ERR_MSG,
          cancelText: null,
          okText: "Ok",
        });
        error.message = PERMISSION_ERR_MSG;
        throw error;
      }

      // if axios config has _ignoreError set to true, then don't handle error
      if (error.config?._ignoreError) throw error;

      let msg = getErrorMessage(
        error.response?.data?.error || error.response?.data,
        ""
      );
      if (!msg)
        msg = `${
          error.response?.statusText ? error.response.statusText + "! " : ""
        }${error.message}`;
      error.message = msg;

      if(error.response?.status === 401 &&
        error.config.url == "/auth/refresh"){
          localStorage.clear();
          window.location.href = `${window.location.origin}/login`
          return
        }

      if (
        error.response?.status === 401 &&
        error.config.url !== "/auth/login"
      ) {
        const tokens = await authService.refreshToken();
        console.log("refresh response", tokens);
        localStorage.setItem("accessToken", tokens!.accessToken);
        localStorage.setItem("refreshToken", tokens!.refreshToken);
        error.config.headers.Authorization = `Bearer ${tokens!.accessToken}`;
        console.log("retrying request");
        const data = await axios(error.config);
        console.log("data: ", data);
        return data;
      }

      globalErrorHandler(error);
      throw error;
    } catch (e) {
      throw error;
      console.log(e);
    }
  }
);

export default axios;
