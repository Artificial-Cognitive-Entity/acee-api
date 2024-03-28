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

  const displayStatus = (mess: string, status: number) => {

    console.log(status)
    if (status == 200) {
      setSuccess("success");
      setMessage(mess);
    } else {
      setSuccess("fail");
      setMessage(mess);
    }
  };

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

    console.log(emailRes)
    const result = await emailRes.json();
    console.log(result)
    if (result.status == 200) {
      displayStatus(result.message, result.status);
    } else {
      displayStatus(result.error, result.status);
    }
  };

  console.log(row);
  return (
    <div className="">
      <Menu>
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
          <Menu.Items className=" absolute origin-top-right divide-y ">
            <div className="px-1 py-1">
              <Menu.Item>
                {value == "Locked" ? (
                  <button className="btn btn-active rounded-md">
                    Unlock User
                  </button>
                ) : (
                  <button
                    onClick={handleClick}
                    className="btn btn-active rounded-md z-30"
                  >
                    Resend Email
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <div className="w-full">
        {success == "success" && <Success>{message}</Success>}
        {success == "fail" && <Warning>{message}</Warning>}
        {errorMessage != "" && <Error>{errorMessage}</Error>}
      </div>
    </div>
  );
}
