"use client";
import React, { FormEvent, useState } from "react";
import PRHeader from "./PRHeader";
import InputField from "./Input";
import PRButton from "./PRButton";
import { usePathname, useRouter } from "next/navigation";
import Button from "../button";
const PRForm: React.FC = () => {
  const router = useRouter();
  const url = usePathname();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (e: any) => {
    setError("");
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log("passwords dont match");
      setPassword("");
      setConfirmPassword("");
      setError("Passwords do not match");
      return;
    } else if (password == "" || confirmPassword == "") {
      setError("Both fields must be filled");
    }

    const url = window.location.href;

    const response = await fetch("/api/password_reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, password }),
    });

    console.log(response);
    // Handle success response

    if (response.status == 200) {
      router.push("/login"); // Redirect to login page
    } else {
      console.error("Error creating password:", error);
      setError("Error creating password. Please try again.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md">
        <div className="bg-black rounded-2xl shadow-2xl p-8">
          <PRHeader />
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              onConfirmChange={handleConfirmPasswordChange}
              onPassChange={handlePasswordChange}
            />
            <Button
              type="submit"
              className="w-full py-2 mb-4 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PRForm;
