import React, { useEffect, useState } from "react";
import useSWRImmutable from "swr";

// TODO: ERROR HANDLING
// TODO: LOADING STATE

interface TableProps {
  toggleModal: (type: string) => void;
  loadingState: (status: boolean) => void;
}

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { columns } from "@/app/components/admin/Table/columns";
import Loader from "@/app/lib/loader";
import AddUserIcon from "../CreateUser/AddUserIcon";
import Button from "../../button";

const UserTable = ({ toggleModal, loadingState }: TableProps) => {
  const { data: originalData, isValidating, error } = useSWRImmutable("/api/get_group", {revalidateOnFocus: false, refreshInterval: 3000});

  const [editedRows, setEditedRows] = useState({});
  const [info, setInfo] = useState<any>([]);

  useEffect(() => {
    if (isValidating) {
      loadingState(isValidating);
      return;
    } else {
      loadingState(isValidating);
      setInfo(() => {
        return [...originalData];
      });
    }
  }, [isValidating, originalData]);

  const table = useReactTable({
    data: info,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      updateData: (rowIndex: number, columnID: string, value: string) =>
        // change the target cell only
        setInfo((prev: any[]) =>
          prev.map((row: any, index: number) =>
            index === rowIndex ? { ...prev[rowIndex], [columnID]: value } : row
          )
        ),
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setInfo((old: any[]) =>
            old.map((row: any, index: number) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        }
      },
      updateRow: async (rowIndex: number) => {
        const response = await fetch("/api/update_user", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info[rowIndex]),
        });
        return response.json();
      },
      editedRows,
      setEditedRows,
      removeRow: async (rowIndex: number) => {
        const response = await fetch("/api/delete_user", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info[rowIndex]),
        });
        return response.json();
      },
    },
  });

  return (
    <>
      {originalData && (
        <>
          <div className="overflow-y-auto rounded-md">
            <div className="bg-base-300 rounded-b-md overflow-y-auto w-full">
              <div className="overflow-y-auto rounded-md w-full"></div>
              <div className=" flex justify-between items-center bg-base-100 rounded-t-md text-center p-3 w-full">
                <p>people in your group</p>

                <div className="flex content-center justify-center gap-3">
                  <Button
                    onClick={() => {
                      toggleModal("CREATE");
                    }}
                  >
                    <AddUserIcon />
                  </Button>
                </div>
              </div>
              <div className="overflow-y-auto rounded-md ">
                {/* check if there are users to display */}
                {table.getRowModel().rows.length > 0 ? (
                  <>
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

                        <>
                          {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="text-center min-h-80">
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
                      </tbody>
                    </table>
                  </>
                ) : (
                  <>
                    <div className="flex justify-center items-center w-full h-44">
                      no users to display
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserTable;
