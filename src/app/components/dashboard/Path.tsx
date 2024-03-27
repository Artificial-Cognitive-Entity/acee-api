"use client";
import { usePathname } from "next/navigation";
import React from "react";
import DashArea from "../admin/DashArea";
import ChatArea from "../chat/chatarea";
import SearchArea from "../search/SearchArea";
import type { User } from "next-auth";

const Path = (user: User) => {
  const pathName = usePathname();

  return (
    <div className="h-full w-full overflow-y-hidden">
      {pathName === "/chat" && <ChatArea />}
      {pathName === "/search" && <SearchArea />}
      {pathName === "/dashboard" &&
      user.role.toLowerCase() == "administrator" ? (
        <DashArea
          role={user.role}
          id={user.id}
          group={user.group}
          email={user.email}
        />
      ) : (
        <h1>you are not an admin!</h1>
      )}
    </div>
  );
};

export default Path;
