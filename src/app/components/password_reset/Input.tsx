"use client";
import React from "react";

const InputField: React.FC = () => {
  return (
    <>
      <div className="mb-4">
        <label htmlFor="password" className="block text-white font-medium mb-2 text-center">
          Password
        </label>
        <input
          autoFocus
          id="password"
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-black text-white"
        />

        <label htmlFor="retype-password" className="block text-white font-medium mb-2 mt-4 text-center">
          Retype Password
        </label>
        <input
          id="retype-password"
          type="password"
          placeholder="Retype your password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-black text-white"
        />
      </div>
    </>
  );
};

export default InputField;