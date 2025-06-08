import { Role } from "@/modules/auth/types/profile.type";
import NotFound from "@/pages/404/404";
import { Preview } from "@/pages/preview";
import { ReactNode } from "react";

export type RouterConfig = {
  layoutType?: "empty" | "auth" | "dashboard" | "none";
  authType?: "public" | "private" | "none";
  allowedRoles?: Role[];
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
      layoutType: "empty",
      authType: "public",
      component: <Preview />,
      route: {
        path: "/",
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
