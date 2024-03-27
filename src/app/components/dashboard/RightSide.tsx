import React from "react";
import type { User } from "next-auth";
import Path from "./Path";

const RightSide = (user: User) => {
  return (
    <Path
      role={user.role}
      id={user.id}
      group={user.group}
      email={user.email}
    ></Path>
  );
};

export default RightSide;
