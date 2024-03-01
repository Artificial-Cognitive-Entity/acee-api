"use client";
import React from "react";
import { usePathname } from "next/navigation";
import SearchArea from "../search/SearchArea";
import DashArea from "../admin/DashArea";
import ChatArea from "../chat/chatarea";

const RightSide = () => {
  const pathName = usePathname();
  return (
    <div className="h-full w-full overflow-y-hidden">
      {pathName === "/chat" && <ChatArea />}
      {pathName === "/search" && <SearchArea />}
      {pathName === "/dashboard" && <DashArea />}
    </div>
  );
};

export default RightSide;
