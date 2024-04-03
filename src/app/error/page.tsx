import React from "react";
import ErrorIcon from "../components/error/ErrorIcon";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-8xl">500 ERROR</h1>
      <ErrorIcon></ErrorIcon>
      <div className="text-6xl text-center">
        <h1>This is awkward...</h1>
        <h1>Something went wrong on our end.</h1>
        <h2>Please try again later.</h2>
      </div>
    </div>
  );
};

export default ErrorPage;
