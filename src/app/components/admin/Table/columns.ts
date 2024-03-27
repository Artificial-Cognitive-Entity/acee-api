import { User } from "@/app/lib/schemas/user";
import { createColumnHelper } from "@tanstack/react-table";
import EditControls from "../EditUser/EditControls";
import EditableCell from "../EditUser/EditableCell";

const columnHelper = createColumnHelper<User>();

export const columns = [
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