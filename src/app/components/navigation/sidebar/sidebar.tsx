"use client";
import React, { useEffect, useState } from "react";
import HouseIcon from "./house";
import SearchIcon from "./search";
import Link from "next/link";
import RobotIcon from "../../chat/RobotIcon";
import ModeSwap from "../../ModeSwap";
import { signOut } from "next-auth/react";
import type { User } from "next-auth";
import { useRouter } from "next/navigation";
import { FaUserGroup } from "react-icons/fa6";

const Sidebar = (user: User) => {
  const [role, setRole] = useState(user.role);
  const router = useRouter();

  useEffect(() => {
    setRole(user.role);
  }, [user]);
  return (
    <>
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay bg-base-300"
      ></label>
      <ul className="menu p-4 w-45 h-full bg-base-300 text-base-content justify-around ">
        {/* Sidebar content here */}

        {role == "Administrator" && (
          <li>
            <Link href="/dashboard" className="justify-center flex">
              <FaUserGroup className="grow-0 shrink-0 basis-auto w-8 h-8" />
            </Link>
          </li>
        )}

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
          <ModeSwap/>
        </li>
        <li>
          <button
            className="justify-center flex"
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                router.push("/"); // Redirect to the dashboard page after signing out
              });
            }}
          >
            Log out
          </button>
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
