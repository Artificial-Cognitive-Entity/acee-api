"use client";
import React, { useEffect, useState } from "react";
import Button from "../../button";
import Success from "./Alerts";
import { Error } from "./Alerts";
import { Warning } from "./Alerts";
import { Transition } from "@headlessui/react";

interface FunctionArgs {
  callBackStatus: (status: string) => void;
}

const UserForm = () => {
  const [formData, setFormData] = useState<any>({
    fName: "",
    lName: "",
    email: "",
    role: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [message, setMessage] = useState("");
  
  const displayStatus = (mess: string, status: number) => {
    if (status == 200) {
      setSuccess("success");
      setMessage(mess);
    } else {
      setSuccess("fail");
      setMessage(mess);
    }
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setErrorMessage("");

    const res = await fetch("/api/create_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });

    if (res.status == 500) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else if (res.status == 200) {
      const response = await res.json();
      displayStatus(response.message, res.status);

      // reset the form
      setFormData({
        fName: "",
        lName: "",
        email: "",
        role: "",
      });
    }

    //conflict error (duplicate email)
    else {
      const response = await res.json();
      displayStatus(response.message, res.status);
    }
  };
  return (
    <>
   
        <div className=" flex flex-col items-center w-full gap-4">
          <h1 className="font-bold text-2xl">Create a New User</h1>

          <form
            onSubmit={handleSubmit}
            method="post"
            className="flex flex-col gap-1 w-1/2"
          >
            <label>
              First Name
              <input
                id="fName"
                name="fName"
                type="text"
                onChange={handleChange}
                required
                value={formData.fName}
                className="input input-bordered input-accent max-w-xs flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none placeholder:text-grey-700 bg-grey-200 rounded-2xl"
              />
            </label>
            <label>Last Name</label>
            <input
              id="lName"
              name="lName"
              type="text"
              onChange={handleChange}
              required
              value={formData.lName}
              className="input input-bordered input-accent max-w-xs flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none placeholder:text-grey-700 bg-grey-200 rounded-2xl"
            />
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
              value={formData.email}
              className="input input-bordered input-accent max-w-xs flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none placeholder:text-grey-700 bg-grey-200 rounded-2xl"
            />

            <label>Role</label>
            <select
              id="role"
              name="role"
              onChange={handleChange}
              required
              value={formData.role}
              className="select select-bordered select-accent max-w-xs leading-4 flex items-center w-full px-5 py-4 mr-2 mb-4 text-sm font-medium outline-none rounded-2xl"
            >
              <option value="none" defaultValue="none" hidden>
                Select a Role
              </option>
              <option value="user">User</option>
              <option value="admin">Administrator</option>
              <option value="admin">Moderator</option>
              <option value="guest">Guest</option>
            </select>

            <Button type="submit" className=" btn-accent rounded-md">
              Create User
            </Button>
          </form>
          <div className="w-full">
            {success == "success" && <Success>{message}</Success>}
            {success == "fail" && <Warning>{message}</Warning>}
            {errorMessage != "" && <Error>{errorMessage}</Error>}
          </div>
        </div>
    </>
  );
};

export default UserForm;
