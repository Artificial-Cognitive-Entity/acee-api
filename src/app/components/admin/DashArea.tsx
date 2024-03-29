import React, { useEffect, useState } from "react";
import UserTable from "./Table/UserTable";
import Modal from "./Options/Modal";
import Button from "../button";
import AddUserIcon from "./CreateUser/AddUserIcon";
import { SWRConfig } from "swr";
import Loader from "@/app/lib/loader";
import {type User } from "next-auth";

type MODALS = "CLOSED" | "CREATE" | "CONFIRM";
const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const DashArea = (user: User) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentModal, setCurrentModal] = useState<MODALS>("CLOSED");

  const toggleModal = (type: string) => {
    setShowModal(!showModal);

    if (showModal) {
      if (type == "CONFIRM") {
        setCurrentModal("CONFIRM");
      } else {
        setCurrentModal("CREATE");
      }
    } else {
      setCurrentModal("CLOSED");
    }
  };

  const loadingStatus = (status: boolean) => {
    console.log(status);
    if (status == false) {
      console.log(status);
      setLoading(status);
    }
  };

  return (
    <>
      <Modal isOpen={!showModal} type={currentModal} user={user} />
      <div className="flex justify-center items-center h-screen flex-col w-full">
        <div className="flex flex-col w-full h-full rounded-md ">
          <div className="flex justify-between items-center">
            <div className="bg-purple-900 w-2/12 h-2/12 text-center rounded-md text-lg m-3 p-3 font-bold text-white">
              Your Group: {user.group}
            </div>
            <div className="bg-purple-900 w-2/12 h-2/12 text-center rounded-md text-lg m-3 p-3 font-bold text-white">
              Your Role: {user.role}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center h-full gap-5 ml-3 mr-3 mb-12 rounded-md overflow-y-auto">
            <div className="bg-purple-900 w-2/12 h-2/12 text-center rounded-md text-lg m-3 p-3 font-bold text-white">
              {" "}
              Manage your group below
            </div>

            <div className="w-5/6 overflow-y-auto rounded-md">
              <div className="w-full">
                <div className="bg-base-300 rounded-b-md overflow-y-auto min-h-80">
                  {loading && <Loader></Loader>}

                  {user && (
                    <SWRConfig value={{ fetcher }}>
                      <UserTable
                        toggleModal={toggleModal}
                        loadingState={loadingStatus}
                      />
                    </SWRConfig>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default DashArea;
