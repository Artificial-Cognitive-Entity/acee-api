"use client";
import { usePathname } from "next/navigation";
import React from "react";
import DashArea from "../admin/DashArea";
import ChatArea from "../chat/chatarea";
import SearchArea from "../search/SearchArea";
import type { User } from "next-auth";
import { useSession } from "next-auth/react";

const Path = (user: User) => {
  const pathName = usePathname();
  const { data: session, status } = useSession()
  return (
    <div className="w-full">
      {Object.keys(user).length != 0 ? (
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
      ) : (
        <div>YOU ARE NOT LOGGED IN </div>
      )}
    </div>
  );
};

export default Path;
