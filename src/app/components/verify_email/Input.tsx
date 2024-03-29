"use client";
import React from "react";

interface InputProps {
  onPassChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ onPassChange, onConfirmChange }: InputProps) => {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-white font-medium mb-2 text-center"
        >
          Create Password
        </label>
        <input
          autoFocus
          id="password"
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-black text-white"
          onChange={onPassChange}
        />

        <label
          htmlFor="retype-password"
          className="block text-white font-medium mb-2 mt-4 text-center"
        >
          Retype Password
        </label>
        <input
          id="retype-password"
          type="password"
          placeholder="Retype your password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-black text-white"
          onChange={onConfirmChange}
        />
      </div>
    </>
  );
};

export default InputField;
