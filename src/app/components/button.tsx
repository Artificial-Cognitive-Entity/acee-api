"use client";

import React from "react";
import { cn } from "../lib/utils";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  children?: React.ReactNode | React.JSX.Element;
  className?: string;
  type?: "submit" | "reset" | "button";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  name?: string;
}
const Button = ({ onClick, type, className = "", children, name }: Props) => {
  return (
    <button
      type={type}
      className={cn("btn btn-active rounded-md", className)}
      name={name}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
