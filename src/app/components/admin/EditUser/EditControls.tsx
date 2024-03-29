import React from "react";
import Button from "../../button";
import EditIcon from "./EditIcon";
import TrashIcon from "../../chat/trash";
import RevertIcon from "./RevertIcon";
import AcceptIcon from "./AcceptIcon";

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
    meta?.deleteRow(row.index);
    meta?.removeRow(row.index);
  };

  return meta?.editedRows[row.id] ? (
    <div className="flex justify-center gap-3">
      <Button className="text-white" name="done" onClick={setEditedRows}>
        <AcceptIcon></AcceptIcon>
      </Button>
      <Button
        type="button"
        className="text-white"
        name="cancel"
        onClick={setEditedRows}
      >
        <RevertIcon />
      </Button>
      <Button className="text-white" name="delete" onClick={removeRow}>
        <TrashIcon />
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
