import NotFound from "@/pages/404/404";
import { Auth } from "@/pages/auth /auth";
import { Conversation } from "@/pages/messages";
import { ReactNode } from "react";

export type RouterConfig = {
  layoutType?: "empty" | "auth" | "dashboard" | "none";
  authType?: "public" | "private" | "none";
  allowedRoles?: string[];
  component: ReactNode;
  menuItem?: {
    title: ReactNode;
    icon: ReactNode;
    inHeader?: boolean;
  };
  subRoutes?: RouterConfig[];
  route?: {
    path: string;
    errorElement?: ReactNode;
  };
};

export const useRouterConfig = (): RouterConfig[] => {
  return [
    {
      layoutType: "dashboard",
      authType: "private",
      component: <Conversation />,
      route: {
        path: "/",
      },
    },
    {
      layoutType: "auth",
      authType: "public",
      component: <Auth />,
      route: {
        path: "/login",
      },
    },
    {
      layoutType: "empty",
      authType: "none",
      component: <NotFound />,
      route: {
        path: "*",
      },
    },
  ];
};
