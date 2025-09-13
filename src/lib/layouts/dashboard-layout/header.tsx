import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { authActions } from "@/modules/auth/slices/auth.slice";
import { MenuOutlined } from "@ant-design/icons";
import { useResponsive } from "ahooks";
import { Layout, Space } from "antd";
import { useCallback } from "react";
import { Logo } from "./sidebar";

const { Header: AntdHeader } = Layout;

function Header() {
  const dispatch = useAppDispatch();
  const { md } = useResponsive();
  const collapsed = useAppSelector((state) => state.auth.sidebarCollapsed);

  const toggleCollapsed = useCallback(() => {
    dispatch(authActions.toggleSidebarCollapsed());
  }, []);

  return (
    <AntdHeader className="justify-between border-b-2 border-primary-400">
      {md ? (
        <div />
      ) : (
        <Space align="center" size={20}>
          <Logo collapsed={collapsed} />
          <div className="mt-1">
            <MenuOutlined onClick={toggleCollapsed} className="text-[18px]" />
          </div>
        </Space>
      )}

      <Space size={20}></Space>
    </AntdHeader>
  );
}

export default Header;
