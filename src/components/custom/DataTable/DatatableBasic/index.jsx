import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { Pagination } from "../Pagination";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function showLoading(
  columns
) {
  const loadingItems = []
  for (let i = 0; i < 3; i++) {
    loadingItems.push(
      <TableRow key={"loading-" + i}>
        {columns.map((col, ind) => (
          <TableCell key={"loading-" + i +"-"+ ind}>
            <Skeleton className="h-4 w-[70%]" />
          </TableCell>
        ))}
      </TableRow>
    )
  }
  return loadingItems
}

export default function DataTableBasic({
     className,
     columns,
     data,
     rowCount,
     isLoading,
     error,
     sorting,
     onSortingChange,
     pagination,
     onPaginationChange,
     rowEachPage,
     classNameTableRow
}){
     const initialState = {}
     if (pagination) initialState["pagination"] = pagination
     if (sorting) initialState["sorting"] = sorting

     const table = useReactTable({
          columns,
          manualPagination: true,
          data: data,
          rowCount: data.length,
          // rowCount: data?.content?.count,
          // data: data?.content?.results || [],
          enableSortingRemoval: false,
          getCoreRowModel: getCoreRowModel(),
          getSortedRowModel: getSortedRowModel(),
          getPaginationRowModel: getPaginationRowModel(),
          onSortingChange,
          onPaginationChange,
          state: initialState
     })

     console.log(data, rowCount)

     const elementLoading = showLoading(columns)

     return (
          <div className={className}>
               <div className="rounded-md border">
               <Table>
                    <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                         {headerGroup.headers.map((header) => {
                         return (
                              <TableHead key={header.id} style={{ minWidth: header.getSize() }}                    >
                              {header.isPlaceholder
                              ? null
                              : <div
                                   className={
                                        header.column.getCanSort()
                                        ? 'cursor-pointer select-none flex items-center gap-1'
                                        : ''
                                   }
                                   onClick={header.column.getToggleSortingHandler()}
                                   title={
                                        header.column.getCanSort()
                                        ? header.column.getNextSortingOrder() === 'asc'
                                        ? 'Sort ascending'
                                        : header.column.getNextSortingOrder() === 'desc'
                                             ? 'Sort descending'
                                             : 'Clear sort'
                                        : undefined
                                   }
                                   >
                                   {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                   )}
                                   {{
                                        asc: <FiChevronUp />,
                                        desc: <FiChevronDown />,
                                   }[header.column.getIsSorted()] ?? null}
                                   </div>
                              }
                              </TableHead>
                         )
                         })}
                    </TableRow>
                    ))}
                    </TableHeader>
                    <TableBody>
                    {isLoading 
                    ? elementLoading 
                    : table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                         <TableRow
                         key={row.id}
                         data-state={row.getIsSelected() && "selected"}
                         className={row.original?.countDeactive === 6 ? 'bg-danger' : classNameTableRow}
                         >
                         {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                         ))}
                         </TableRow>
                    ))
                    ) : (
                    <TableRow>
                         <TableCell colSpan={columns.length} className="h-24 text-center">
                         No results.
                         </TableCell>
                    </TableRow>
                    )}
                    </TableBody>
               </Table>
               </div>
               { pagination && <Pagination table={table} rowEachPage={rowEachPage} /> }
          </div>
     )

}