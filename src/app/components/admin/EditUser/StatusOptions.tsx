import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import Button from "../../button";

interface CellProp {
  value: string;
  header: string;
}

export default function StatusOptions({ header, value }: CellProp) {
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
                  <Button>Unlock User</Button>
                ) : (
                  <Button>Resend Email</Button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
