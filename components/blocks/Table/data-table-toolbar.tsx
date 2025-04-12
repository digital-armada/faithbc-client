// "use client";
// import { Table } from "@tanstack/react-table";
// import { Input } from "../ui/input";
// import { X } from "lucide-react";
// import { Button } from "../ui/button";
// import { DataTableFacetedFilter } from "./data-table-filter";
// import { blocked, confirmed, roles } from "./data";
//
// interface DataTableToolbarProps<TData> {
//   table: Table<TData>;
// }
//
// export function DataTableToolbar<TData>({
//   table,
// }: DataTableToolbarProps<TData>) {
//   const isFiltered = table.getState().columnFilters.length > 0;
//   console.log("table", table);
//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex flex-1 items-center space-x-2">
//         {/* USER SEARCH FILTER */}
//         <Input
//           placeholder="Filter Users..."
//           value={
//             (table.getColumn("firstName")?.getFilterValue() as string) ?? ""
//           }
//           onChange={(event) =>
//             table.getColumn("firstName")?.setFilterValue(event.target.value)
//           }
//           className="h-8 w-[150px] lg:w-[250px]"
//         />
//
//         {/* FILTER */}
//         {table.getColumn("role") && (
//           <DataTableFacetedFilter
//             column={table.getColumn("role")}
//             title="Role"
//             options={roles}
//           />
//         )}
//
//         {/* FILTER */}
//         {table.getColumn("blocked") && (
//           <DataTableFacetedFilter
//             column={table.getColumn("blocked")}
//             title="Blocked"
//             options={blocked.map((option) => ({
//               ...option,
//               value: option.value.toString(),
//             }))}
//           />
//         )}
//         {/* FILTER */}
//         {table.getColumn("confirmed") && (
//           <DataTableFacetedFilter
//             column={table.getColumn("confirmed")}
//             title="Confirmed"
//             options={confirmed.map((option) => ({
//               ...option,
//               value: option.value.toString(),
//             }))}
//           />
//         )}
//
//         {/* RESET BOTH FILTERS */}
//         {isFiltered && (
//           <Button
//             variant="ghost"
//             onClick={() => table.resetColumnFilters()}
//             className="h-8 px-2 lg:px-3"
//           >
//             Reset
//             <X className="ml-2 h-4 w-4" />
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }
