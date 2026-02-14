import * as React from 'react';
import {
    Search,
    Plus,
    Edit,
    Trash2,
    RotateCcw,
    Shield,
    Download,
    Filter,
    Users,
    UserCheck,
    UserX
} from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import { userService } from '../../services/user.service';
import type { User } from '../../services/user.service';
import { DataTable } from '../ui/DataTable';
import { Button, Input, Card, cn } from '../ui';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const UserManagement = () => {
    const [users, setUsers] = React.useState<User[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [total, setTotal] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState('');
    const [status, setStatus] = React.useState<'active' | 'archived' | 'all'>('active');
    const [stats, setStats] = React.useState({ total: 0, active: 0, archived: 0 });

    const fetchUsers = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await userService.getUsers({
                page,
                limit: 10,
                search,
                status
            });
            setUsers(response.data.users);
            setTotal(response.data.meta.total);

            // Mocking stats for now based on response
            setStats(prev => ({
                ...prev,
                total: status === 'all' ? response.data.meta.total : prev.total,
                active: status === 'active' ? response.data.meta.total : prev.active,
                archived: status === 'archived' ? response.data.meta.total : prev.archived
            }));

        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setIsLoading(false);
        }
    }, [page, search, status]);

    React.useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleArchive = async (id: number) => {
        if (confirm('Arsip pelanggan ini?')) {
            await userService.archiveUser(id);
            fetchUsers();
        }
    };

    const handleRestore = async (id: number) => {
        if (confirm('Pulihkan pelanggan ini?')) {
            await userService.restoreUser(id);
            fetchUsers();
        }
    };

    const handlePermanentDelete = async (id: number) => {
        if (confirm('Hapus permanen pelanggan ini? Tindakan ini tidak dapat dibatalkan.')) {
            await userService.deletePermanent(id);
            fetchUsers();
        }
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(users);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        XLSX.writeFile(workbook, "Maulana_Users.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Daftar Pelanggan Maulana Laundry", 14, 15);
        autoTable(doc, {
            head: [['ID', 'Nama', 'Email', 'Role', 'Status']],
            body: users.map(u => [
                u.id,
                u.name,
                u.email,
                u.role,
                u.deleted_at ? 'Archived' : 'Active'
            ]),
            startY: 20,
        });
        doc.save("Maulana_Users.pdf");
    };

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
            cell: ({ row }) => <span className="text-slate-500 font-mono text-xs">#{row.getValue('id')}</span>
        },
        {
            accessorKey: 'name',
            header: 'Nama Pelanggan',
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs text-center border">
                        {String(row.getValue('name'))[0]}
                    </div>
                    <div>
                        <div className="font-medium text-slate-900">{row.getValue('name')}</div>
                        <div className="text-xs text-slate-500">{row.original.email}</div>
                    </div>
                </div>
            )
        },
        {
            accessorKey: 'role',
            header: 'Role',
            cell: ({ row }) => (
                <div className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                    row.getValue('role') === 'admin' ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                )}>
                    {row.getValue('role') === 'admin' ? <Shield size={12} className="mr-1" /> : null}
                    {String(row.getValue('role')).toUpperCase()}
                </div>
            )
        },
        {
            accessorKey: 'created_at',
            header: 'Terdaftar',
            cell: ({ row }) => <span className="text-slate-500">{new Date(row.getValue('created_at')).toLocaleDateString('id-ID')}</span>
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => {
                const u = row.original;
                const isArchived = u.deleted_at !== null && u.deleted_at !== undefined;

                return (
                    <div className="flex items-center space-x-2">
                        {!isArchived ? (
                            <>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                    <Edit size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-orange-600 hover:text-orange-700 hover:bg-orange-50" onClick={() => handleArchive(u.id)}>
                                    <Trash2 size={16} />
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleRestore(u.id)}>
                                    <RotateCcw size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handlePermanentDelete(u.id)}>
                                    <Trash2 size={16} />
                                </Button>
                            </>
                        )}
                    </div>
                );
            }
        }
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Pelanggan', value: stats.total, icon: Users, color: 'blue' },
                    { label: 'Aktif', value: stats.active, icon: UserCheck, color: 'green' },
                    { label: 'Diarsipkan', value: stats.archived, icon: UserX, color: 'red' },
                ].map((stat, i) => (
                    <Card key={i} className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                            </div>
                            <div className={cn("p-2 rounded-lg", `bg-${stat.color}-50 text-${stat.color}-600`)}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input
                        placeholder="Cari nama atau email..."
                        className="pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex items-center space-x-2 w-full md:w-auto">
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        {(['active', 'archived', 'all'] as const).map((s) => (
                            <button
                                key={s}
                                onClick={() => setStatus(s)}
                                className={cn(
                                    "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                                    status === s ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
                                )}
                            >
                                {s === 'active' ? 'Aktif' : s === 'archived' ? 'Arsip' : 'Semua'}
                            </button>
                        ))}
                    </div>

                    <Button variant="outline" size="icon" onClick={exportToExcel} title="Export Excel">
                        <Download size={18} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={exportToPDF} title="Export PDF">
                        <Filter size={18} />
                    </Button>
                    <Button className="whitespace-nowrap">
                        <Plus size={18} className="mr-2" /> Tambah Data
                    </Button>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={users}
                total={total}
                page={page}
                onPageChange={setPage}
                isLoading={isLoading}
            />
        </div>
    );
};
