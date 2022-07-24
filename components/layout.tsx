import { NextPage } from "next";
import React from "react";
import { cls } from "../libs";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

const Layout: NextPage<LayoutProps> = ({
  title,
  canGoBack,
  hasTabBar,
  children,
}) => {
  return (
    <div>
      <div className="bg-white w-full text-lg font-medium py-3 fixed text-gray-800 border-b top-0 justify-center flex items-center">
        {title && <span>{title}</span>}
      </div>
      <div className={cls("pt-16", hasTabBar && "pb-16")}>{children}</div>
      {hasTabBar && (
        <nav className="bg-white text-gray-800 border-t fixed bottom-0 pb-10 pt-3 flex justify-between items-center"></nav>
      )}
    </div>
  );
};

export default Layout;
