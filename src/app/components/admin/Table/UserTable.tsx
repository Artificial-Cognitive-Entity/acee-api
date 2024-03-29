interface TableProps {
  toggleModal: (type: string) => void;
  loadingState: (status: boolean) => void;
}

import React, { useEffect, useState } from "react";
import useSWRImmutable from "swr";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "@/app/components/admin/Table/columns";
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
        <div className="bg-black rounded-lg shadow-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
            <div className="flex justify-center items-center">
              <Button
                onClick={() => {
                  toggleModal("CREATE");
                }}
              >
                <AddUserIcon />
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
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
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"
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
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTable;