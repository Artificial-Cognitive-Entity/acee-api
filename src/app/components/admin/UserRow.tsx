"use client";
import React, { useState } from "react";
import { Person } from "@styled-icons/bootstrap";
import { ThreeDotsVertical } from "@styled-icons/bootstrap";

interface FunctionArgs {
  user: any;
  callBack: () => void;
}

const UserRow = ({ user, callBack }: FunctionArgs) => {
  return (
    <tr className="text-center">
      {/* <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th> */}
      {/* <td>
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <Person />
          </div>
        </div>
      </td> */}
      <td>
        <div className="font-bold">
          {user.first_name} {user.last_name}
          {/* <span className="badge badge-ghost badge-sm">{user.role}</span> */}
        </div>
      </td>
      <td>
        <span className="badge badge-ghost badge-lg">{user.role}</span>
      </td>
      <td>{user.status}</td>
      <th>
        <button className="btn btn-ghost btn-md" onClick={() => callBack()}>
          <ThreeDotsVertical size="48"></ThreeDotsVertical>
        </button>
      </th>
    </tr>
  );
};

export default UserRow;
