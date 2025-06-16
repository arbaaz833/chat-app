import axios from "@/lib/axios.config";
import { objectToFormData } from "@/lib/utils/misc.utils";

async function login({ email, password }: { email: string; password: string }) {
  return await axios.post("/auth/login", { email, password });
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
  return axios.post("/auth/signup", formData);
}

async function refreshToken() {
  const res = await axios.post("/auth/refresh");
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
};

export default authService;
