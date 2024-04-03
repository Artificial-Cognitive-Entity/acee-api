"use client";
import React, { useState } from "react";
import LoginForm from "../components/sign_in/Login";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Warning } from "../components/admin/CreateUser/Alerts";
import { Transition } from "@headlessui/react";

const Login = () => {
  const searchParams = useSearchParams();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const callback = searchParams.get("callbackUrl");

    console.log(callback);
    if (callback) {
      // Display notification informing the user to log in
      setAlert(true);
    }
  }, []);

  return (
    <>
      {alert && (
        <Warning>You must login first before you can access that page</Warning>
      )}
      <LoginForm></LoginForm>
    </>
  );
};

export default Login;
