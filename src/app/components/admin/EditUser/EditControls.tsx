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
    console.log(e.target);
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));

    if (eleName !== "edit") {
      meta?.revertData(row.index, e.target.name === "cancel");
    }
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
      <Button className="text-green-900" name="done" onClick={setEditedRows}>
        ✔
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
