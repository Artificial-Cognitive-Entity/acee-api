import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { columns } from "@/app/components/admin/Table/columns";

const UserTable = () => {
  const users = [
    {
      first_name: "Emily",
      last_name: "Jones",
      email: "emily.jones@example.com",
      role: "Guest",
      status: "Active",
      user_id: "1",
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      role: "Guest",
      status: "Active",
      user_id: "2",
    },
    {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      role: "Guest",
      status: "Active",
      user_id: "1",
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
      updateRow: async (rowIndex: number) => {
        const response = await fetch("/api/update_user", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data[rowIndex]),
        });
        return response.json();
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
