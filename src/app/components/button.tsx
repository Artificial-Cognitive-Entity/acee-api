"use client";

import React from "react";
import { cn } from "../lib/utils";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  children?: React.ReactNode | React.JSX.Element;
  className?: string;
  type?: "submit" | "reset" | "button";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button = ({ onClick, type, className = "", children }: Props) => {
  return (
    <button type={type} className={cn("btn btn-active", className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
