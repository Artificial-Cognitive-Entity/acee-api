import React, { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import StatusOptions from "./StatusOptions";

interface CellProp {
  getValue: () => string;
  row: any;
  column: any;
  table: any;
}

const EditableCell: React.FC<CellProp> = ({ getValue, row, column, table }) => {
  const initialValue = row.original == null ? "" : getValue();
  const [value, setValue] = useState<string>(initialValue); // Setting value type to string
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;

  const onBlur = () => {
    tableMeta?.updateData(row.index, column.id, value);
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Using React.ChangeEvent to specify the event type
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (row.original) {
    if (tableMeta?.editedRows[row.id]) {
      return columnMeta?.type === "select" ? (
        <select
          className="select bg-transparent shrink-0 grow-0 basis-auto border-purple-600 border-2 rounded-lg text-base text-center"
          onChange={onSelectChange}
          value={initialValue}
        >
          {columnMeta?.options?.map((option: any) => (
            <option
              className="text-black text-left text-base"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      ) : columnMeta?.type === "action" ? (
        <>
          <div className="border-purple-600 border-2 rounded-lg relative">
            <StatusOptions
              row={table.getRow(row.index).original}
              header=""
              value={value}
            ></StatusOptions>
          </div>
        </>
      ) : columnMeta?.type === "email" ? (
        <span className="text-center text-base bg-transparent input w-4/5 over-hidden whitespace-nowrap text-ellipsis">
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ) : (
        <input
          value={value.charAt(0).toUpperCase() + value.slice(1)}
          onBlur={onBlur}
          onChange={(e) => setValue(e.target.value)}
          className="text-center text-base rounded-lg bg-transparent input w-full over-hidden whitespace-nowrap text-ellipsis border-purple-600 border-2"
          type={columnMeta?.type || "text"}
        />
      );
    }

    return (
      <span className="text-center text-base bg-transparent input w-full over-hidden whitespace-nowrap text-ellipsis">
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    );
  } else {
    return <></>;
  }
};

export default EditableCell;
