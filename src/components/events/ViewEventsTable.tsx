'use client';

import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import { BadgeMinus } from 'lucide-react';

import { Button } from '../ui/button';
import { useEffect, useMemo, useState } from 'react';
import SearchBar from '../SearchBar';
import DataTable from '../DataTable';
import { getAllEvents } from '@/api/data/events.data';
import { Event } from '@/lib/types';
import { getColumns } from './ViewEventsTableColumns';

interface Pagination {
  pageIndex: number;
  pageSize: number;
}

export function ViewEventsDataTable() {
  const [data, setData] = useState<Event[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [activeFilter, setActiveFilter] = useState<string>('');
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<Pagination>({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchEvents = async (data: Pagination) => {
    const events = await getAllEvents({
      limit: data.pageSize,
      offset: data.pageIndex * data.pageSize,
    });
    if (!events) {
      return;
    }
    setData(events);
  };

  useEffect(() => {
    fetchEvents(pagination);
  }, [pagination, pagination.pageIndex, pagination.pageSize]);

  const columns = useMemo(() => getColumns(), []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    pageCount: Math.ceil(data.length / pagination.pageSize),
  });

  const handleFilterClick = (status: string) => {
    setActiveFilter(status);
    table.getColumn('status')?.setFilterValue(status);
  };

  return (
    <div>
      <SearchBar
        placeholder="Pesquisar eventos"
        onChange={(e) => table.setGlobalFilter(e.target.value)}
      />
      <div className="flex flex-row justify-between items-center w-full space-y-4">
        <div className="space-x-1">
          <Button
            variant="outline"
            size="sm"
            className={`border rounded-xl ${
              activeFilter === '' && 'bg-neutral-300'
            }`}
            onClick={() => handleFilterClick('')}
          >
            Todos
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterClick('upcoming')}
            className={`border rounded-xl ${
              activeFilter === 'upcoming' && 'bg-neutral-300'
            }`}
          >
            Próximo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterClick('started')}
            className={`border rounded-xl ${
              activeFilter === 'started' && 'bg-neutral-300'
            }`}
          >
            Em andamento
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterClick('ended')}
            className={`border rounded-xl ${
              activeFilter === 'ended' && 'bg-neutral-300'
            }`}
          >
            Encerrado
          </Button>
        </div>

        <div>
          <Button
            type="button"
            variant="outline"
            className="rounded-xl bg-sky-800 text-white"
            onClick={() => {}}
          >
            Increver-se
          </Button>
        </div>
      </div>
      <div className="w-full mb-3 mt-2 bg-sky-50 border rounded-xl h-fit-content flex items-center space-x-1 px-2">
        <BadgeMinus />
        <div className="text-left text-neutral-600 p-2 ">
          Selecionados ({table.getFilteredSelectedRowModel().rows.length})
        </div>
      </div>

      <DataTable table={table} />
    </div>
  );
}
