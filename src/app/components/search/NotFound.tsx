"use client";
import React from "react";
import Image from "next/image";
import NotFoundImage from "@/app/images/no_result.png";

const NotFound = () => {
  return (
    <>
      <Image
        className="w-96 h-96"
        src={NotFoundImage}
        alt="No search results found"
      ></Image>
    </>
  );
};

export default NotFound;
