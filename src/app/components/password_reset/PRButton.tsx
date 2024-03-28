import React from "react";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  children?: React.ReactNode | React.JSX.Element;
  className?: string;
  type?: "submit" | "reset" | "button";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  name?: string;
}

const PRButton: React.FC = ({ onClick, type, className = "", children, name }: Props) => {
  return (
    <button type={type} className="w-full py-2 mb-4 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
      Reset Password
    </button>
  );
};

export default PRButton;