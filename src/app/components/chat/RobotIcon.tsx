"use client";
import React from "react";
import { Robot } from "@styled-icons/bootstrap";
import styled from "styled-components";
import { cn } from "@/app/lib/utils";

interface Props {
  className: string;
}

export const RobotImage = ({ className }: Props) => {
  return (
    <Robot
      className={cn("grow-0 shrink-0 basis-auto w-12 h-12", className)}
    ></Robot>
  );
};
const RobotIcon = () => {
  return <Robot className="w-7 h-7" />;
};

export default RobotIcon;
