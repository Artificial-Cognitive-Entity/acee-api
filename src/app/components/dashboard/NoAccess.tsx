import React from "react";
import LockIcon from "./LockIcon";

const NoAccess = () => {
  return (
    <div className="flex flex-col content-center items-center">
      <LockIcon></LockIcon>

      <h1 className='text-4xl'>You do not have access to this page.</h1>
    </div>
  );
};

export default NoAccess;
