// "use client";
//
// import * as React from "react";
// import {
//   ColumnDef,
//   SortingState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
//
// import { Button } from "@/components/ui/button";
//
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Sermon, SermonResponse } from "@/features/sermons/types";
// import { ChevronDown } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { strapiRequestClient } from "@/lib/strapiClient-service";
// import { sermonsService } from "@/features/sermons/sermons-service";
// import { ApiResponse } from "@/types/types";
//
// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   initialData: ApiResponse<Sermon[]>;
// }
//
// export function DataTable<TData extends Sermon, TValue>({
//   initialData,
//   columns,
// }: DataTableProps<TData, TValue>) {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//
//   const [{ pageIndex, pageSize }, setPagination] = React.useState({
//     pageIndex: 0,
//     pageSize: 10,
//   });
//
//   const queryClient = useQueryClient();
//   const searchTerm = queryClient.getQueryData(["sermons", "search"]) as string;
//   console.log("searchTerm", searchTerm);
//   const { data, isLoading, isFetching } = useQuery({
//     queryKey: ["sermons", pageIndex, pageSize, searchTerm],
//     queryFn: async (): Promise<SermonResponse> => {
//       const response = await sermonsService.getClientInfiniteSermons({
//         page: pageIndex + 1,
//         search: searchTerm || "",
//       });
//       return response as SermonResponse;
//     },
//     initialData,
//   });
//
//   // Pre-fetch next page
//   React.useEffect(() => {
//     if (pageIndex < (data?.meta?.pagination?.pageCount ?? 0) - 1) {
//       queryClient.prefetchQuery({
//         queryKey: ["sermons", pageIndex + 1, pageSize, searchTerm],
//         queryFn: () =>
//           sermonsService.getClientInfiniteSermons({
//             page: pageIndex + 2,
//             search: searchTerm || "",
//           }),
//       });
//     }
//   }, [pageIndex, pageSize, queryClient, searchTerm]);
//
//   const table = useReactTable({
//     data: data?.data || [],
//     pageCount: data?.meta?.pagination?.pageCount ?? -1,
//     columns: columns as ColumnDef<Sermon, any>[],
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onPaginationChange: setPagination,
//     onSortingChange: setSorting,
//     manualPagination: true,
//     manualSorting: true,
//     manualFiltering: true,
//     state: {
//       sorting,
//       pagination: {
//         pageIndex,
//         pageSize,
//       },
//     },
//   });
//
//   return (
//     <div className="w-full space-y-4">
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder ? null : (
//                       <div
//                         {...{
//                           className: header.column.getCanSort()
//                             ? "cursor-pointer select-none"
//                             : "",
//                           onClick: header.column.getToggleSortingHandler(),
//                         }}
//                       >
//                         {flexRender(
//                           header.column.columnDef.header,
//                           header.getContext(),
//                         )}
//                         {{
//                           asc: " 🔼",
//                           desc: " 🔽",
//                         }[header.column.getIsSorted() as string] ?? null}
//                       </div>
//                     )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext(),
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex items-center justify-between space-x-2 py-4">
//         <div className="space-x-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.previousPage()}
//             disabled={pageIndex === 0}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.nextPage()}
//             disabled={pageIndex >= (data?.meta?.pagination?.pageCount ?? 0) - 1}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//       {(isLoading || isFetching) && (
//         <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60">
//           Loading...
//         </div>
//       )}
//     </div>
//   );
// }
