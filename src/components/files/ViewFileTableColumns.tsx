import { ColumnDef } from "@tanstack/react-table";
import { File } from "@/lib/schemas/file.schema";

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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        switch (row.original.status) {
          case "waiting":
            return "Aguardando";
          case "done":
            return "Concluído";
          default:
            return "Em andamento";
        }
      },
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
      accessorKey: "event_id",
      header: "Evento",
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
