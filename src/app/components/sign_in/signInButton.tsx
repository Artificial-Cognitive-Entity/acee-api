import React from "react";

const signInButton = () => {
  return (
    <button className="btn btn-accent rounded-md">
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        Sign in
      </span>
    </button>
  );
};

export default signInButton;
