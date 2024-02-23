import React, { useEffect, useState } from "react";
import UserForm from "../CreateUser/UserForm";
interface ModalProps {
  isOpen: boolean;
  type: string;
}

const Modal = ({ isOpen, type }: ModalProps) => {
  const [isDone, setIsDone] = useState(false);

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

    if (type == "OPTIONS") {
      const element: HTMLDialogElement = getElement("adminModal");
      modalControls(element, isDone);
    } else if (type == "CREATE") {
      const element: HTMLDialogElement = getElement("createModal");
      modalControls(element, isDone);
    }
  }, [isDone, type, isOpen]);

  if (type == "OPTIONS") {
    return (
      <>
        <dialog id="adminModal" className="modal self-center">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press sESC key or click outside to close</p>
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
            <UserForm></UserForm>
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
