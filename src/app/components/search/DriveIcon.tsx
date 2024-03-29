"use client";
import React from "react";
import Image from "next/image";
import DriveIconImage from "@/app/images/driveicon.png";

const DriveIcon = () => {
  return (
    <>
      <Image
        src={DriveIconImage}
        alt="No search results found"
      ></Image>
    </>
  );
};

export default DriveIcon;
