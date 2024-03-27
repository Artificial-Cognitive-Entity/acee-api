import React from "react";
import Sidebar from "../navigation/sidebar/sidebar";
import RightSide from "./RightSide";
import MenuIcon from "../navigation/sidebar/menu";
import { getServerSession, type User } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Dash = async () => {
  const session = await getServerSession(options);
  const user = session.user;
  return (
    <div className="h-full w-full overflow-y-hidden">
      {session ? (
        <div className=" h-full w-full drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center bg-base-200">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-red drawer-button lg:hidden self-start"
            >
              <MenuIcon />
            </label>
            <RightSide
              role={user.role}
              id={user.id}
              group={user.group}
              email={user.email}
            />
          </div>
          <div className="drawer-side">
            <Sidebar
              role={user.role}
              id={user.id}
              group={user.group}
              email={user.email}
            ></Sidebar>
          </div>
        </div>
      ) : (
        <h1>you are not logged in</h1>
      )}
    </div>
  );
};

export default Dash;
