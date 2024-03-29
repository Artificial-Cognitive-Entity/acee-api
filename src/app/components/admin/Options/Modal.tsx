import React, { useEffect, useState } from "react";
import UserForm from "../CreateUser/UserForm";
import type { User } from "next-auth"; 
interface ModalProps {
  isOpen: boolean;
  type: string;
  user: User
}

const Modal = ({ isOpen, type, user }: ModalProps) => {
  const [isDone, setIsDone] = useState(false);

  console.log(isOpen)
  const closeModal = (element: HTMLDialogElement) => {
    element.close();
  };

  const getElement = (id: string) => {
    return document.getElementById(id) as HTMLDialogElement;
  };

  useEffect(() => {
    const modalControls = (element: HTMLDialogElement, isDone: boolean) => {
      if (element) {
        if (isOpen) {
          element.showModal();
        } else {
          closeModal(element);
        }
      }
    };

    if (type == "CONFIRM") {
      const element: HTMLDialogElement = getElement("adminModal");
      modalControls(element, isDone);
    } else if (type == "CREATE") {
      const element: HTMLDialogElement = getElement("createModal");
      modalControls(element, isDone);
    }
  }, [isDone, type, isOpen]);

  if (type == "CONFIRM") {
    return (
      <>
        <dialog id="adminModal" className="modal self-center">
        <div className="modal-box flex justify-center rounded-lg">
           Changes have been made
          </div>
          <form method="dialog" className="modal-backdrop w-full">
            <button>close</button>
          </form>
        </dialog>
      </>
    );
  }

  if (type == "CREATE") {
    return (
      <>
        <dialog id="createModal" className="modal self-center">
          <div className="modal-box flex justify-center rounded-lg">
            <UserForm role={user.role} id={user.id} group={user.group} email={user.email}></UserForm>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </>
    );
  }
};

export default Modal;
