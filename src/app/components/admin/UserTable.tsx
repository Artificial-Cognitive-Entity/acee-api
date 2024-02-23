import React, { useState } from "react";
import UserRow from "./UserRow";

interface FunctionArgs {
  callBackToDash: () => void;
}

const UserTable = ({ callBackToDash }: FunctionArgs) => {
  const users: any[] = [
    {
      first_name: "Dummy",
      last_name: "The First",
      email: "dummy1@org.com",
      role: "Desktop Support Tech",
      status: "active",
    },
    {
      first_name: "Dummy",
      last_name: "The Second",
      email: "dummy1@org.com",
      role: "Software Engineer",
      status: "active",
    },
    {
      first_name: "Dummy",
      last_name: "The Third",
      email: "dummy1@org.com",
      role: "IT Manager",
      status: "active",
    },
    {
      first_name: "Dummy",
      last_name: "The Fouth",
      email: "dummy1@org.com",
      role: "IT Support",
      status: "unverified",
    },
    {
      first_name: "Dummy",
      last_name: "The Fifth",
      email: "dummy1@org.com",
      role: "IT Support",
      status: "locked",
    },
    {
      first_name: "Dummy",
      last_name: "The Fifth",
      email: "dummy1@org.com",
      role: "IT Support",
      status: "locked",
    },
    {
      first_name: "Dummy",
      last_name: "The Fifth",
      email: "dummy1@org.com",
      role: "IT Support",
      status: "locked",
    },
    {
      first_name: "Dummy",
      last_name: "The Fifth",
      email: "dummy1@org.com",
      role: "IT Support",
      status: "locked",
    },
  ];

  return (
    <>
      <div className="overflow-y-auto rounded-md ">
        <table className="table rounded-md ">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th className="w-1/4">Name</th>
              <th className="w-1/4">Role</th>
              <th className="w-1/4">Status</th>
              <th className="w-1/4">Options</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {users.length > 0 ? (
              <>
                {users.map((user, index) => (
                  <UserRow
                    callBack={callBackToDash}
                    user={user}
                    key={index}
                  ></UserRow>
                ))}
              </>
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;
