import type {
    ColumnDef,
    SortingState,
} from "@tanstack/react-table"
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
} from "@tanstack/react-table"
import * as React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./Table"
import { Button } from "./index"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    total?: number
    page?: number
    limit?: number
    isLoading?: boolean
    onPageChange?: (page: number) => void
    onSortingChange?: (sorting: SortingState) => void
}

export function DataTable<TData, TValue>({
    columns,
    data,
    total = 0,
    page = 1,
    limit = 10,
    isLoading = false,
    onPageChange,
    onSortingChange,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: (newSorting) => {
            setSorting(newSorting)
            if (onSortingChange) onSortingChange(typeof newSorting === 'function' ? newSorting(sorting) : newSorting)
        },
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
        manualPagination: true,
        pageCount: Math.ceil(total / limit),
    })

    return (
        <div className="space-y-4">
            <div className="rounded-md border bg-white relative">
                {isLoading && (
                    <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                        <Loader2 className="animate-spin text-primary" size={32} />
                    </div>
                )}
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    {isLoading ? "Memuat data..." : "Tidak ada hasil."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {total > limit && (
                <div className="flex items-center justify-between px-2">
                    <div className="text-sm text-slate-500">
                        Menampilkan {Math.min((page - 1) * limit + 1, total)} sampai {Math.min(page * limit, total)} dari {total} entri
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange?.(page - 1)}
                            disabled={page <= 1 || isLoading}
                        >
                            <ChevronLeft size={16} className="mr-1" /> Sebelum
                        </Button>
                        <div className="text-sm font-medium">Halaman {page}</div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange?.(page + 1)}
                            disabled={page * limit >= total || isLoading}
                        >
                            Sesudah <ChevronRight size={16} className="ml-1" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
