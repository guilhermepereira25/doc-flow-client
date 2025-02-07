import { Checkbox } from '@/components/ui/checkbox';
import { Event } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';

export function getColumns(): ColumnDef<Event>[] {
    return [
        {
            id: 'select',
            header: ({ table }) => {
                return (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            table.getIsSomePageRowsSelected()
                        }
                        onCheckedChange={(value) =>
                            table.toggleAllPageRowsSelected(!!value)
                        }
                        aria-label="Select all rows"
                    />
                );
            },
            cell: ({ row }) => {
                return (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                );
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: 'Nome',
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const status = row.original.status;
                switch (status) {
                    case 'started':
                        return <span>Em andamento</span>;
                    case 'ended':
                        return <span>Encerrado</span>;
                    case 'upcoming':
                        return <span>Próximo</span>;
                }
            },
        },
        {
            accessorKey: 'start_at',
            header: 'Data de início',
            cell: ({ row }) => {
                if (!row.original.start_at) {
                    return <span>Não definido</span>;
                }
                const date = new Date(row.original.start_at);
                const dateFormated = date.toLocaleString('pt-BR');
                return <span>{dateFormated}</span>;
            },
        },
        {
            accessorKey: 'end_at',
            header: 'Data de término',
            cell: ({ row }) => {
                if (!row.original.end_at) {
                    return <span>Não definido</span>;
                }
                const date = new Date(row.original.end_at);
                const dateFormated = date.toLocaleString('pt-BR');
                return <span>{dateFormated}</span>;
            },
        },
    ];
}
