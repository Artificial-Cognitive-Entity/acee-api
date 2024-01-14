import React from "react";
import HouseIcon from "./house";
import SearchIcon from "./search";
import Link from "next/link";
import RobotIcon from "../../chat/RobotIcon";

const Sidebar = () => {
  return (
    <>
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu p-4 w-45 h-full text-base-content justify-around ">
        {/* Sidebar content here */}
        <li>
          <Link href="/dashboard" className="justify-center flex">
            <HouseIcon></HouseIcon>
          </Link>
        </li>
        <li>
          <Link href="/search" className="justify-center flex">
            <SearchIcon />
          </Link>
        </li>
        <li>
          <Link href="/chat" className="justify-center flex">
            <RobotIcon />
          </Link>
        </li>
        <li>
          <Link href="/">Log out</Link>
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
