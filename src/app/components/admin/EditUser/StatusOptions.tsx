import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import Success, { Warning, Error } from "../CreateUser/Alerts";

interface CellProp {
  value: string;
  header: string;
  row: any;
}

export default function StatusOptions({ row, header, value }: CellProp) {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [message, setMessage] = useState("");

  value = value.charAt(0).toUpperCase() + value.slice(1);
  const handleClick = async (e: any) => {
    e.preventDefault();

    const email = row.email;
    const token = row.token;
    const emailRes = await fetch("/api/send_verify_email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, token }),
    });

    console.log(emailRes);
    const result = await emailRes.json();
    console.log(result);
  };

  const handleReset = async (e: any) => {
    e.preventDefault();

    const email = row.email;
    const token = row.token;
    const passRes = await fetch("/api/send_reset_password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, token }),
    });

    console.log(passRes);
    const result = await passRes.json();
    console.log(result);
  };

  console.log(row);
  return (
    <div className="relative z-10" >
      <Menu as="div">
        <Menu.Button className="text-lg text-center bg-transparent w-full rounded-lg over-hidden whitespace-nowrap text-ellipsis">
          {value}
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items as="div" className="relative">
            <div className="px-1 py-1">
              <Menu.Item as="div" className="absolute">
                {value == "Locked" && (
                  <button className="btn btn-active rounded-md  bg-black  hover:bg-purple-600">
                    Unlock User
                  </button>
                )}
                {value == "Unverified" && (
                  <button
                    onClick={handleClick}
                    className="btn btn-active rounded-md z-60  bg-black  hover:bg-purple-600"
                  >
                    Resend Email
                  </button>
                )}

                {value == "Active" && (
                  <>
                    <button
                      onClick={handleReset}
                      className="btn btn-active bg-black hover:bg-purple-600 rounded-md z-30"
                    >
                      Reset Password
                    </button>
                  </>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {/* <div className="w-full">
        {success == "success" && <Success>{message}</Success>}
        {success == "fail" && <Warning>{message}</Warning>}
        {errorMessage != "" && <Error>{errorMessage}</Error>}
      </div> */}
    </div>
  );
}
