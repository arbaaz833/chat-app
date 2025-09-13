import axios from "@/lib/axios.config";
import { objectToFormData } from "@/lib/utils/misc.utils";

async function login({ email, password }: { email: string; password: string }) {
  return await axios.post("/auth/login", { email, password });
}

async function userDetails() {
  return await axios.get("/auth/userDetails");
}

async function logout() {
  return axios.delete("/auth/logout");
}

async function signup(data: {
  email: string;
  password: string;
  username: string;
  file?: File;
}) {
  const formData = objectToFormData(data);
  return axios.post("/auth/signup", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

async function refreshToken() {
  const token = localStorage.getItem("refreshToken");
  let res = await axios.post(
    "/auth/refresh",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return {
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  };
}

const authService = {
  login,
  logout,
  signup,
  refreshToken,
  userDetails,
};

export default authService;
