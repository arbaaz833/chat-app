import { Conversations } from "@/lib/components/conversations/Conversations";
import { SearchBar } from "@/lib/components/searchBar/SearchBar";
import { useThemeMode } from "@/lib/contexts/root.context";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { debounced } from "@/lib/utils/misc.utils";
import { cn } from "@/lib/utils/styles.utils";
import { authActions } from "@/modules/auth/slices/auth.slice";
import { useResponsive } from "ahooks";
import { Drawer, Layout, Typography } from "antd";
import React, { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const { Sider } = Layout;

export const Logo: React.FC<{
  collapsed?: boolean;
  showLogoText?: boolean;
  className?: string;
}> = ({ collapsed, showLogoText = false, className }) => {
  const { themeMode } = useThemeMode();

  return (
    <Link
      to="/"
      className={cn("flex items-center justify-center space-x-2", className)}
    >
      {collapsed ? (
        <img
          alt="site-logo"
          src={
            themeMode === "light"
              ? "/logo-icon-dark.svg"
              : "/logo-icon-light.svg"
          }
          className="!h-[20px]"
        />
      ) : (
        <img alt="site-logo" src="/logo.svg" className="w-[132px]" />
      )}
      {!collapsed && showLogoText && (
        <Typography.Text>Logo Text</Typography.Text>
      )}
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const { md } = useResponsive();
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((state) => state.auth.sidebarCollapsed);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sidebarRef.current) {
      const sidebar = sidebarRef.current;
      sidebar.addEventListener("scroll", debounced(handleScroll, 300));
      return () => {
        sidebar.removeEventListener("scroll", debounced(handleScroll, 300));
      };
    }
  }, [sidebarRef.current]);

  const handleScroll = useCallback(() => {
    if (sidebarRef.current) {
      const sidebar = sidebarRef.current;
      const { clientHeight, scrollTop, scrollHeight } = sidebar;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        // Load more items or perform any action when scrolled to the bottom
        console.log("Scrolled to the bottom");
      }
    }
  }, [sidebarRef.current]);

  const toggleCollapsed = useCallback(() => {
    dispatch(authActions.toggleSidebarCollapsed());
  }, []);

  return (
    <>
      {md ? (
        <div>
          <SearchBar />
          <Sider
            ref={sidebarRef}
            width={300}
            className="h-[calc(100vh-64px)] overflow-y-scroll !bg-background p-2"
          >
            <Conversations />
          </Sider>
        </div>
      ) : (
        <Drawer
          onClose={toggleCollapsed}
          open={!collapsed}
          title={<Logo collapsed={collapsed} />}
        >
          {new Array(20).fill(0).map((_, index) => (
            <div key={index} className="p-4">
              <Typography.Text>Menu Item {index + 1}</Typography.Text>
            </div>
          ))}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
