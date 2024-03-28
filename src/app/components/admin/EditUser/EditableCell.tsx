import React, { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import StatusOptions from "./StatusOptions";

interface CellProp {
  getValue: () => string;
  row: any;
  column: any;
  table: any;
}

const EditableCell = ({ getValue, row, column, table }: CellProp) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;

  const onBlur = () => {
    tableMeta?.updateData(row.index, column.id, value);
  };

  const onSelectChange = (e: any) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      <select
        className="select bg-transparent border-red-500 border-2 rounded-lg text-lg"
        onChange={onSelectChange}
        value={initialValue}
      >
        {columnMeta?.options?.map((option: any) => (
          <option
            className="text-black text-left"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    ) : columnMeta?.type === "action" ? (
      <>
        <div className="border-red-500 border-2 rounded-lg">
          <StatusOptions
            row={table.getRow(row.index).original}
            header=""
            value={value}
          ></StatusOptions>
        </div>
      </>
    ) : (
      <input
        value={value.charAt(0).toUpperCase() + value.slice(1)}
        onBlur={onBlur}
        onChange={(e) => setValue(e.target.value)}
        className="text-center text-lg rounded-lg bg-transparent input w-4/5 over-hidden whitespace-nowrap text-ellipsis border-red-500 border-2"
        type={columnMeta?.type || "text"}
      />
    );
  }

  return (
    <span className="text-center text-lg bg-transparent input w-4/5 over-hidden whitespace-nowrap text-ellipsis">
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </span>
  );
};

export default EditableCell;
