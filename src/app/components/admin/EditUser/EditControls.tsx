import React from "react";
import Button from "../../button";
import EditIcon from "./EditIcon";

interface CellProps {
  row: any;
  table: any;
}

const EditControls = ({ row, table }: CellProps) => {
  const meta = table.options.meta;

  const setEditedRows = (e: any) => {
    const eleName = e.target.name;
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));

    if (eleName !== "edit") {
      e.currentTarget.name === "cancel"
        ? meta?.revertData(row.index)
        : meta?.updateRow(row.index);
    }
  };

  const removeRow = () => {
    meta?.removeRow(row.index);
  };
  
  return meta?.editedRows[row.id] ? (
    <div className="flex justify-center gap-3">
      <Button
        type="button"
        className="text-red-900"
        name="cancel"
        onClick={setEditedRows}
      >
        X
      </Button>
      <Button className="text-purple-900" name="done" onClick={setEditedRows}>
        ✔
      </Button>
      <Button className="text-red-900" name="delete" onClick={removeRow}>
        delete
      </Button>
    </div>
  ) : (
    <Button
      className=" base-content w-12 h-12"
      name="edit"
      onClick={setEditedRows}
    >
      <EditIcon />
    </Button>
  );
};

export default EditControls;