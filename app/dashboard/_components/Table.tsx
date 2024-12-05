"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";
import Dropdown from "./Dropdown";
import { updateUserRole } from "@/features/auth/auth-actions";
import { format, parseISO } from "date-fns";
import { TiTick, TiTimes } from "react-icons/ti";

const columnHelper = createColumnHelper();

export default function Table({ users, roles }) {
  const [data, setData] = useState(users);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const rolesList = roles?.data?.roles.map((role) => role); // Ensure roles are correctly fetched

  useEffect(() => {
    setData(users);
  }, [users]);

  const columns = [
    columnHelper.accessor("firstName", {
      header: "First Name",
      cell: (info) => info.getValue(),
      minSize: 150,
      enableSorting: true,
    }),
    columnHelper.accessor("lastName", {
      header: "Last Name",
      cell: (info) => info.getValue(),
      minSize: 150,
      enableSorting: true,
    }),
    columnHelper.accessor("confirmed", {
      header: "Active",
      cell: (info) => <p>{info.getValue() ? <TiTick /> : <TiTimes />}</p>,
      minSize: 150,
      enableSorting: true,
    }),
    columnHelper.accessor("contactNumber", {
      header: "Contact",
      cell: (info) => info.getValue(),
      minSize: 150,

      enableSorting: true,
    }),
    columnHelper.accessor("dateOfBirth", {
      header: "D.O.B",
      cell: (info) => {
        const date = info.getValue();
        if (date === null) {
          return "-";
        }
        try {
          const parsedDate = new Date(info.getValue());
          return format(parsedDate, "PPP");
        } catch (error) {
          return "Invalid Date";
        }
      },
      minSize: 150,
      enableSorting: true,
    }),
    //     columnHelper.accessor("role", {
    //       // Use role.id to ensure correct data binding
    //       header: "Role",
    //       cell: ({ cell, row }) => {
    //         return (
    //           <Dropdown
    //             currentRole={row.original.role} // Pass selected role ID
    //             roles={rolesList}
    //             onRoleChange={
    //               async (newRoleId) =>
    //                 await updateUserRole(row.original.id, newRoleId)
    //               // handleRoleChange(row.original.id, newRoleId)
    //             } // Handle role change
    //           />
    //         );
    //       },
    //       minSize: 150,
    //
    //       enableSorting: true,
    //     }),
    columnHelper.group({
      header: "address",
      id: "address",
      columns: [
        columnHelper.accessor("address.street", {
          header: "Street",
          footer: (props) => props.column.id,
        }),
        columnHelper.accessor("address.suburb", {
          header: "Suburb",
          footer: (props) => props.column.id,
        }),
        columnHelper.accessor("address.state", {
          header: "State",
          footer: (props) => props.column.id,
        }),
        columnHelper.accessor("address.pCode", {
          header: "PostCode",
          footer: (props) => props.column.id,
        }),
      ],
    }),
    // columnHelper.display({}),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { pagination, sorting, globalFilter: filtering },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  //   const handleRoleChange = async (userId, newRoleId) => {
  //     try {
  //       const response = await mutateData(
  //         "PUT",
  //         `/api/users/${userId}`,
  //         newRoleId,
  //       );
  //
  //       if (!response.ok) {
  //         throw new Error("Failed to update user role");
  //       }
  //
  //       // Optionally, update local state or fetch updated user data
  //       console.log("User role updated successfully");
  //     } catch (error) {
  //       console.error("Error updating user role:", error);
  //     }
  //   };

  return (
    <>
      <div className="mt-6 flex max-w-md gap-x-4">
        <input
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="text-hawkesburyGrey focus:ring-hawkesburyRed mb-10 min-w-0 flex-auto rounded-md border-2 bg-white/5 px-3.5 py-2 outline-none ring-1 ring-inset ring-white/20 focus:ring-2 sm:text-sm sm:leading-6"
          placeholder="Search Contacts ... "
        />
      </div>

      <div className="table-wrapper">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="bg-gray-200 px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-600"
                    style={{
                      position: "relative",
                      cursor: header.column.columnDef.enableSorting
                        ? "pointer"
                        : "default",
                    }}
                    onClick={
                      header.column.columnDef.enableSorting
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.columnDef.enableSorting && (
                          <span className="ml-2">
                            {header.column.getIsSorted() === "asc" && (
                              <FaSortUp />
                            )}
                            {header.column.getIsSorted() === "desc" && (
                              <FaSortDown />
                            )}
                            {!header.column.getIsSorted() && <FaSort />}
                          </span>
                        )}
                      </div>
                    )}
                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`resizer ${
                          header.column.getIsResizing() ? "isResizing" : ""
                        }`}
                      ></div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      minWidth: cell.column.columnDef.minSize,
                    }}
                    className="whitespace-nowrap px-4 py-3"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full">
        <hr className="mt-6" />
        <div className="mt-6 flex justify-between text-xs">
          <button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex items-center gap-1 disabled:opacity-35"
          >
            <MdFirstPage />
            <span>First</span>
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex items-center gap-1 disabled:opacity-35"
          >
            <MdNavigateBefore />
            Prev
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex items-center gap-1 disabled:opacity-35"
          >
            Next
            <MdNavigateNext />
          </button>
          <button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            className="flex items-center gap-1 disabled:opacity-35"
          >
            Last
            <MdLastPage />
          </button>
        </div>
        <div className="mt-6 flex w-full items-center justify-center gap-1 text-xs">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </div>
      </div>
    </>
  );
}
