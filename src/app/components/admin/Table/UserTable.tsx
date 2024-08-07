interface TableProps {
  toggleModal: (type: string) => void;
  loadingState: (status: boolean) => void;
}

import { Error } from "../CreateUser/Alerts";
import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "@/app/components/admin/Table/columns";
import AddUserIcon from "../CreateUser/AddUserIcon";
import Button from "../../button";
import useSWR from "swr";

const UserTable = ({ toggleModal, loadingState }: TableProps) => {
  const {
    data: originalData,
    isValidating,
    mutate,
  } = useSWR("/api/get_group", {
    revalidateOnFocus: false,
  });

  const [editedRows, setEditedRows] = useState({});
  const [info, setInfo] = useState<any>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isValidating) {
      loadingState(isValidating);
      return;
    } else {
      loadingState(isValidating);

      if (typeof originalData[Symbol.iterator] === "function") {
        setInfo(() => {
          return [...originalData];
        });
      } else {
        setError(true);
      }
    }
  }, [isValidating, loadingState, originalData]);

  const table = useReactTable({
    data: info,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      editedRows,
      setEditedRows,
      updateData: (rowIndex: number, columnID: string, value: string) =>
        setInfo((prev: any[]) =>
          prev.map((row: any, index: number) =>
            index === rowIndex ? { ...prev[rowIndex], [columnID]: value } : row
          )
        ),
      revertData: (rowIndex: number) => {
        setInfo((old: any[]) =>
          old.map((row: any, index: number) =>
            index === rowIndex ? originalData[rowIndex] : row
          )
        );
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

      deleteRow: (rowIndex: number) => {
        setInfo((old: any[]) =>
          old.filter((row: any, index: number) => index !== rowIndex)
        );

        const updatedEditedRows: any = { ...editedRows };
        delete updatedEditedRows[rowIndex];
        setEditedRows(updatedEditedRows);
      },
      showConfirm: (rowIndex: number) => {
        console.log("hello");
      },
      removeRow: async (rowIndex: number) => {
        setInfo((old: any[]) =>
          old.filter((row: any, index: number) => index !== rowIndex)
        );
        const response = await fetch("/api/delete_user", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info[rowIndex]),
        });
        if (response.status == 200) {
          mutate("/api/get_group");
          return response.json();
        } else {
          setInfo((old: any[]) => [...old]);
          setEditedRows({ ...editedRows });
        }
      },
    },
  });

  return (
    <>
      {originalData && (
        <div className="bg-black rounded-lg shadow-lg shrink-0 grow-0 basis-0 w-full">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
            <div className="flex justify-center items-center">
              <Button
                className=" border-purple-900 border-4"
                onClick={() => {
                  toggleModal("CREATE");
                }}
              >
                <AddUserIcon />
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto overflow-y-hidden w-full">
            <table className="min-w-full divide-y divide-gray-700 text-center w-full">
              <thead className="bg-gray-800">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              {!error ? (
                <tbody className="bg-gray-900 divide-y divide-gray-700">
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-6 py-4 relative whitespace-nowrap text-xl text-white"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ) : (
                <></>
              )}
            </table>
          </div>
        </div>
      )}

      {error && (
        <Error>
          Uh oh, we can not fetch groups right now. Please try again later.
        </Error>
      )}
    </>
  );
};

export default UserTable;
