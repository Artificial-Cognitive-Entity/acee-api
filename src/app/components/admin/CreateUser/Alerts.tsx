import { Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  children?: React.ReactNode | React.JSX.Element;
  className?: string;
}

const Success = ({ className = "", children }: Props) => {
  const [timeIsUp, setTimeIsUp] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimeIsUp(true);
    }, 3500);
  }, []);

  if (timeIsUp) {
    return null;
  }

  return (
    <Transition
      appear={true}
      show={true}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div role="alert" className="alert alert-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{children}</span>
      </div>
    </Transition>
  );
};

export const Warning = ({ className = "", children }: Props) => {
  const [timeIsUp, setTimeIsUp] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimeIsUp(true);
    }, 3500);
  }, []);

  if (timeIsUp) {
    return null;
  }

  return (
    <Transition
      appear={true}
      show={true}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div role="alert" className="alert alert-warning">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>{children}</span>
      </div>
    </Transition>
  );
};

export const Error = ({ className = "", children }: Props) => {
  const [timeIsUp, setTimeIsUp] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimeIsUp(true);
    }, 3500);
  }, []);

  if (timeIsUp) {
    return null;
  }

  return (
    <Transition
      appear={true}
      show={true}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{children}</span>
      </div>
    </Transition>
  );
};
export default Success;
