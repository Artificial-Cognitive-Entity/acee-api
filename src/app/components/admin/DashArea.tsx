import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import Modal from "./Options/Modal";
import Button from "../button";
import AddUserIcon from "./CreateUser/AddUserIcon";
import Success from "./CreateUser/Alerts";

type MODALS = "CLOSED" | "CREATE" | "OPTIONS";
const DashArea = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState<MODALS>("CLOSED");

  const optModal = () => {
    toggleModal("OPTIONS");
  };

  const toggleModal = (type?: string) => {
    
    setShowModal(!showModal);

    if (showModal) {
      if (type == "OPTIONS") {
        setCurrentModal("OPTIONS");
      } else {
        setCurrentModal("CREATE");
      }
    } else {
      setCurrentModal("CLOSED");
    }
  };

  return (
    <>
      <Modal
        isOpen={!showModal}
        type={currentModal}
      />
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="flex flex-col w-full h-full rounded-md">
          <div className="flex justify-between items-center">
            <div className="bg-primary w-1/4 h-1/12 text-center rounded-md text-xl m-3 p-3 font-bold">
              YOUR GROUP NAME
            </div>
            <div className="bg-primary w-2/12 h-2/12 text-center rounded-md text-lg m-3 p-3 font-bold">
              YOUR USER ROLE
            </div>
          </div>

          <div className="flex flex-col justify-center items-center h-full gap-5 ml-3 mr-3 mb-12 rounded-md overflow-y-auto">
            <div className="bg-accent rounded-md p-3 font-bold">
              {" "}
              manage your group below
            </div>
            <div className="w-5/6 overflow-y-auto rounded-md">
              <div className=" flex justify-between items-center bg-base-100 rounded-t-md text-center p-3 w-full">
                <br></br>
                <p className="ml-14">people in your group</p>

                <Button
                  onClick={() => {
                    toggleModal("CREATE");
                  }}
                >
                  <AddUserIcon />
                </Button>
              </div>
              <div className="bg-base-300 rounded-b-md overflow-y-auto">
                <UserTable callBackToDash={optModal}></UserTable>
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
