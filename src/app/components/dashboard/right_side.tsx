"use client";
import React from "react";
import { usePathname } from "next/navigation";
import ChatArea from "../chat/ChatArea";
import SearchArea from "../search/SearchArea";
import DashArea from "./DashArea";



const RightSide = () => {
  const pathName = usePathname();
  return (
    <div className="h-full w-full">
      {pathName === "/chat" && <ChatArea />}
      {pathName === "/search" && <SearchArea />}
      {pathName === "/dashboard" && <DashArea />}
    </div>
  );
};

export default RightSide;
