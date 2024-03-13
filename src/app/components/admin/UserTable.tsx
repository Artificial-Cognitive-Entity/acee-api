import React, { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import EditableCell from "./EditUser/EditableCell";
import EditControls from "./EditUser/EditControls";

type User = {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
};

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("first_name", {
    header: () => "First Name",
    cell: EditableCell,
  }),
  columnHelper.accessor("last_name", {
    header: () => "Last Name",
    cell: EditableCell,
  }),
  columnHelper.accessor("email", {
    header: () => "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("role", {
    header: () => "Role",
    cell: EditableCell,
    meta: {
      type: "select",
      options: [
        { value: "Administrator", label: "Administrator" },
        { value: "Moderator", label: "Moderator" },
        { value: "User", label: "User" },
        { value: "Guest", label: "Guest" },
      ],
    },
  }),
  columnHelper.accessor("status", {
    header: () => "Status",
    cell: EditableCell,
    meta: {
      type: "action",
      options: [
        { value: "Active", label: "Active" },
        { value: "Unverified", label: "Unverified" },
        { value: "Locked", label: "Locked" },
      ],
    },
  }),
  columnHelper.display({
    id: "edit",
    cell: EditControls,
  }),
];

const UserTable = () => {
  const users = [
    {
      first_name: "Jane Doe",
      last_name: "Doe",
      email: "jd@org.com",
      role: "User",
      status: "Locked",
    },
    {
      first_name: "John",
      last_name: "Smith",
      email: "js@org.com",
      role: "Moderator",
      status: "Unverified",
    },
    {
      first_name: "George",
      last_name: "Michael",
      email: "gm@org.com",
      role: "Guest",
      status: "Locked",
    },
  ];
  const [data, setData] = useState(() => [...users]);
  const [originalData, setOriginalData] = useState(() => [...users]);
  const [editedRows, setEditedRows] = useState({});
  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      updateData: (rowIndex: number, columnID: string, value: string) =>
        // change the target cell only
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex ? { ...prev[rowIndex], [columnID]: value } : row
          )
        ),
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          console.log("REVERTING...");
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      editedRows,
      setEditedRows,
    },
  });

  return (
    <>
      <div className="overflow-y-auto rounded-md ">
        <table className="table rounded-md">
          {/* head */}

          {/* get column headers */}
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className=" " key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className="w-1/6" key={header.id}>
                    {/* display column headers */}
                    <div className="flex justify-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {/* rows */}
            {table.getRowModel().rows.length > 0 ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="text-center">
                    {row.getVisibleCells().map((cell) => (
                      // display row data
                      <td key={cell.id} className="">
                        <div className="text-lg">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            ) : (
              <>nothing to display|</>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;
