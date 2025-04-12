import React, { useCallback, useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table as TableInstance,
  OnChangeFn,
  PaginationState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";

// Define the context interface
interface DataTableContextValue<TData> {
  table: TableInstance<TData>;
  isFetching?: boolean;
  isLoading?: boolean;
  enablePagination?: boolean;
}

// Create a properly typed context
const DataTableContext = React.createContext<DataTableContextValue<any> | null>(
  null,
);

// Updated hook with proper typing
export function useDataTable<TData>() {
  const context = React.useContext(DataTableContext);
  if (!context) {
    throw new Error("useDataTable must be used within DataTableProvider");
  }
  return context as DataTableContextValue<TData>;
}

// Root DataTable component with proper typing
interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  children?: React.ReactNode;
  enablePagination?: boolean;
  pageCount?: number;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange?: OnChangeFn<PaginationState>;
  isLoading?: boolean;
  isFetching?: boolean;
  skeletonRowCount?: number;
}

export function DataTable<TData>({
  data,
  columns,
  children,
  enablePagination = false,
  pageCount,
  pagination,
  onPaginationChange,
  isLoading,
  isFetching,
  skeletonRowCount = 5,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    ...(enablePagination
      ? {
          pageCount,
          state: {
            pagination,
          },
          onPaginationChange: onPaginationChange as OnChangeFn<PaginationState>,
          getPaginationRowModel: getPaginationRowModel(),
          manualPagination: !!pageCount,
        }
      : {}),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const contextValue: DataTableContextValue<TData> = {
    table,
    isFetching,
    isLoading,
    enablePagination,
  };

  return (
    <DataTableContext.Provider value={contextValue}>
      <div className="w-full space-y-4">{children}</div>
    </DataTableContext.Provider>
  );
}

// Toolbar Component
export function DataTableToolbar({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4">{children}</div>
  );
}

// Updated Filter Component
interface DataTableFilterProps {
  column: string;
  placeholder?: string;
}

export function DataTableFilter({ column, placeholder }: DataTableFilterProps) {
  const { table } = useDataTable();
  const [value, setValue] = useState<string>("");
  const columnInstance = table.getColumn(column);

  // Sync internal state with table filter value
  const handleFilterValueChange = useCallback(() => {
    const currentFilterValue = columnInstance?.getFilterValue() as string;
    if (currentFilterValue !== value) {
      setValue(currentFilterValue || "");
    }
  }, [columnInstance, value]);

  useEffect(handleFilterValueChange, [handleFilterValueChange]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    columnInstance?.setFilterValue(newValue);

    // Reset to first page when filtering
    table.setPageIndex(0);
  };

  if (!columnInstance) {
    console.warn(`Column "${column}" not found in table`);
    return null;
  }

  return (
    <Input
      placeholder={placeholder || `Filter ${column}...`}
      value={value}
      onChange={handleFilterChange}
      className="max-w-sm"
      autoComplete="off"
    />
  );
}

// Column Visibility Component
export function DataTableColumnVisibility() {
  const { table } = useDataTable();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            const isVisible = column.getIsVisible();
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={isVisible}
                onCheckedChange={(checked) => {
                  column.toggleVisibility(!!checked);
                  // Force a re-render of the table content
                  table.setPageIndex(table.getState().pagination.pageIndex);
                }}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Skeleton components with proper typing
interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div
    className={`animate-pulse rounded bg-gray-200 ${className}`}
    style={{ minHeight: "1rem" }}
  />
);

interface SkeletonRowProps {
  columns: number;
}

const SkeletonRow: React.FC<SkeletonRowProps> = ({ columns }) => (
  <TableRow className="h-12">
    {Array.from({ length: columns }).map((_, index) => (
      <TableCell key={index} className="px-4 py-2">
        <Skeleton className="h-4 w-full" />
      </TableCell>
    ))}
  </TableRow>
);

// Updated Table Content Component for better filtering response
export function DataTableContent<TData>() {
  const { table, isFetching, isLoading, enablePagination } =
    useDataTable<TData>();
  const columnCount = table.getAllColumns().length;
  // Get the number of rows to display in skeleton state
  const skeletonRowCount = enablePagination
    ? (table.getState().pagination?.pageSize ?? 5)
    : 5;
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading || isFetching ? (
            // Render skeleton rows during loading
            Array.from({ length: skeletonRowCount }).map((_, index) => (
              <SkeletonRow key={`skeleton-${index}`} columns={columnCount} />
            ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="h-12"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <div>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columnCount} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// Pagination Component
export function DataTablePagination() {
  const { table, enablePagination } = useDataTable();

  if (!enablePagination) {
    return null;
  }
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          aria-label="First page"
        >
          {"<<"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Previous page"
        >
          {"<"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Next page"
        >
          {">"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          aria-label="Last page"
        >
          {">>"}
        </Button>
      </div>
    </div>
  );
}

export default DataTable;
