import { ColumnDef } from "@tanstack/react-table";
import { File } from "@/lib/schemas/file";

export function getColumns(): ColumnDef<File>[] {
  return [
    {
      accessorKey: "name",
      header: "Nome",
      enableHiding: false,
    },
    {
      accessorKey: "type",
      header: "Tipo de arquivo",
      enableHiding: false,
    },
    {
      accessorKey: "user",
      header: "Responsável",
      cell: ({ row }) => {
        return row.original?.user?.full_name;
      },
      enableHiding: false,
    },
    {
      accessorKey: "created_at",
      header: "Data de criação",
      cell: ({ row }) => {
        const createdAtDate = new Date(row.original.created_at);
        return (
          createdAtDate.toLocaleDateString("pt-br") +
          " " +
          createdAtDate.toLocaleTimeString("pt-br")
        );
      },
      enableHiding: true,
    },
  ];
}
