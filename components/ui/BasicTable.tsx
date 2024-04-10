'use client';
import { deleteUser } from '@/actions/dashboard';
import {
    Column,
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Table,
    useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

// https://tanstack.com/table/latest/docs/framework/react/examples/row-selection

const BasicTable = ({ users }) => {
    const data = useMemo(() => users, []);
    // console.log(data);
    const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
            footer: 'ID',
        },
        {
            header: 'Name',
            accessorFn: row => `${row.firstName} ${row.lastName}`,
        },
        {
            header: 'Group',
            // accessorKey: 'commgroups',
            accessorFn: row => {
                const group = row.commgroups.map(group => group.groupName);
                return group.join(', ');
            },
            footer: 'Group',
        },
        // {
        //     header: 'Name',
        //     columns: [
        //         {
        //             header: 'First',
        //             accessorKey: 'first_name',
        //             footer: 'First name',
        //         },
        //         {
        //             header: 'Last',
        //             accessorKey: 'last_name',
        //             footer: 'Last name',
        //         },
        //     ],
        // },
        //
        //         {
        //             header: 'First Name',
        //             accessorKey: 'firstName',
        //             footer: 'First Name',
        //         },
        //         {
        //             header: 'Last Name',
        //             accessorKey: 'lastName',
        //             footer: 'Last Name',
        //         },
        {
            header: 'Address',
            accessorFn: row => {
                const houseNumber = row?.Address?.houseNumber ?? '';
                const street = row?.Address?.street ?? '';
                const suburb = row?.Address?.Suburb ?? '';
                const state = row?.Address?.state ?? '';
                const postCode = row?.Address?.postCode ?? '';

                return `${houseNumber} ${street} ${suburb} ${state} ${postCode}`;
            },
        },

        {
            header: 'DOB',
            accessorKey: 'dateOfBirth',
            footer: 'DOB',
        },
        {
            header: 'Email',
            accessorKey: 'email',
            footer: 'Email Name',
        },
        {
            header: 'Contact',
            accessorKey: 'contactNumber',
            footer: 'Contact',
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                // console.log(row);
                return (
                    <div className='flex items-center space-x-2'>
                        <div
                            onClick={() => {
                                row.original.id;
                            }}
                            className={
                                'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'
                            }>
                            Delete
                        </div>

                        <div>Edit</div>
                    </div>
                );
            },
        },
    ];

    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });

    // Document for later
    // const DeleteButton = ({ id }) => {
    //     <button onClick={() => handleDeleteUser(id)}>Delete</button>;
    // };

    return (
        <div>
            <input
                type='text'
                value={filtering}
                onChange={e => setFiltering(e.target.value)}
            />
            <table>
                <thead>
                    {table.getHeaderGroups()?.map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}>
                                    {header.isPlaceholder ? null : (
                                        <div>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {
                                                { asc: '🔼', desc: '🔽' }[
                                                    header.column.getIsSorted() ??
                                                        null
                                                ]
                                            }
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                {/* <tfoot>
                    <tr>
                        <td></td>
                    </tr>
                </tfoot> */}
            </table>
            {/* PAGINATION */}
            {/* PAGINATION */}
            {/* PAGINATION */}
            <div>
                <button onClick={() => table.setPageIndex(0)}>
                    First page
                </button>
                <button
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}>
                    Previous page
                </button>
                <button
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}>
                    Next page
                </button>
                <button
                    onClick={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                    }>
                    Last page
                </button>
            </div>
            {/* PAGINATION */}
            {/* PAGINATION */}
            {/* PAGINATION */}
        </div>
    );
};

export default BasicTable;
