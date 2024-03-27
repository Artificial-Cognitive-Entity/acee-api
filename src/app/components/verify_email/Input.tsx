"use client";
import React from "react";

const InputField = () => {
  return (
    <>
      <div>

        <label className="flex" htmlFor="password">Create Password*</label>
        <input
          autoFocus
          id="password"
          type="password"
          placeholder="Enter your password"
          className="input input-bordered input-accent max-w-xs flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none mb-7 placeholder:text-grey-700 bg-grey-200 rounded-2xl"
        />

<label className="flex" htmlFor="password">Retype Password*</label>
        <input
          autoFocus
          id="password"
          type="password"
          placeholder="Retype your password"
          className="input input-bordered input-accent max-w-xs flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none mb-7 placeholder:text-grey-700 bg-grey-200 rounded-2xl"
        />
      </div>
    </>
  );
};

export default InputField;
