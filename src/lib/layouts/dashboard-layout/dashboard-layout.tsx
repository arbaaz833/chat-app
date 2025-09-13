import { useAppDispatch } from "@/lib/redux/store";
import { JSSTheme } from "@/lib/types/misc";
import { authActions } from "@/modules/auth/slices/auth.slice";
import { Layout } from "antd";
import React, { PropsWithChildren, useEffect } from "react";
import { createUseStyles } from "react-jss";
import EmptyLayout from "../empty-layout";
import Sidebar from "./sidebar";

const useStyles = createUseStyles((theme: JSSTheme) => ({
  root: {
    "& .ant-layout-header": {
      backgroundColor: theme.colorBgContainer,
      display: "flex",
      alignItems: "center",
      lineHeight: "unset",
      padding: "0 2rem",
    },
    color: theme.colorText,
  },
  footer: {
    backgroundColor: theme.colorPrimaryBg,
  },
}));

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authActions.userDetails());
  }, []);

  return (
    <EmptyLayout>
      <Layout className={classes.root}>
        <Sidebar />
        <Layout>
          {/* <Header /> */}
          <Layout.Content className="flex-1 flex flex-col overflow-y-auto">
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </EmptyLayout>
  );
};

export default DashboardLayout;
