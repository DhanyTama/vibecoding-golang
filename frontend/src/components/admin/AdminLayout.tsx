import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    Package,
    Settings,
    ChevronLeft,
    LogOut,
    ExternalLink,
    X
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { cn, Button, Card } from '../ui';
import { Link, useNavigate } from 'react-router-dom';
import { Profile } from './Profile';
import { UserManagement } from './UserManagement';

const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: 'DashboardContent' },
    { id: 'users', label: 'Pelanggan', icon: Users, component: 'UserManagement' },
    { id: 'transactions', label: 'Transaksi', icon: ShoppingCart, component: 'Transactions' },
    { id: 'services', label: 'Layanan', icon: Package, component: 'Services' },
    { id: 'settings', label: 'Pengaturan', icon: Settings, component: 'Settings' },
];

export const AdminLayout = () => {
    const {
        isSidebarOpen,
        setSidebarOpen,
        tabs,
        activeTabId,
        addTab,
        removeTab,
        setActiveTab,
        logout,
        user
    } = useAppStore();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 260 : 80 }}
                className="bg-white border-r border-slate-200 flex flex-col relative z-30"
            >
                <div className="p-4 h-16 flex items-center justify-between overflow-hidden">
                    <AnimatePresence mode="wait">
                        {isSidebarOpen ? (
                            <motion.div
                                key="logo-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center space-x-3"
                            >
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">ML</div>
                                <span className="font-bold text-lg whitespace-nowrap">Maulana Admin</span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="logo-icon"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold mx-auto"
                            >
                                ML
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <nav className="flex-grow p-4 space-y-2 overflow-y-auto no-scrollbar">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => addTab({ id: item.id, title: item.label, component: item.component })}
                            className={cn(
                                "w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group",
                                activeTabId === item.id
                                    ? "bg-primary text-white shadow-md shadow-primary/20"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <item.icon size={20} className={cn("min-w-[20px]", isSidebarOpen ? "mr-3" : "mx-auto")} />
                            {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100 space-y-2">
                    <Link
                        to="/"
                        target="_blank"
                        className={cn(
                            "w-full flex items-center px-4 py-3 rounded-xl text-slate-500 hover:bg-blue-50 hover:text-primary transition-all",
                            !isSidebarOpen && "justify-center"
                        )}
                    >
                        <ExternalLink size={20} className={isSidebarOpen ? "mr-3" : ""} />
                        {isSidebarOpen && <span className="font-medium">Lihat Website</span>}
                    </Link>
                    <button
                        onClick={handleLogout}
                        className={cn(
                            "w-full flex items-center px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all",
                            !isSidebarOpen && "justify-center"
                        )}
                    >
                        <LogOut size={20} className={isSidebarOpen ? "mr-3" : ""} />
                        {isSidebarOpen && <span className="font-medium">Keluar</span>}
                    </button>
                </div>

                {/* Toggle Button */}
                <button
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-3 top-20 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 z-40 transition-transform duration-300"
                    style={{ transform: isSidebarOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}
                >
                    <ChevronLeft size={14} className="text-slate-500" />
                </button>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-grow flex flex-col min-w-0">
                {/* Header & Tabs */}
                <header className="bg-white border-b border-slate-200 z-20">
                    <div className="h-16 px-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-slate-800">
                            {tabs.find((t: any) => t.id === activeTabId)?.title || 'Dashboard'}
                        </h2>

                        <div
                            className="flex items-center space-x-4 cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-all"
                            onClick={() => addTab({ id: 'profile', title: 'Profil Saya', component: 'Profile' })}
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold">{user?.name}</p>
                                <p className="text-xs text-slate-500">{user?.role}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
                                {user?.name?.[0]}
                            </div>
                        </div>
                    </div>

                    {/* Tab Bar */}
                    <div className="px-4 pb-0 flex items-center space-x-1 overflow-x-auto no-scrollbar border-t border-slate-50 bg-slate-50/50">
                        {tabs.map((tab: any) => (
                            <div
                                key={tab.id}
                                className={cn(
                                    "group relative flex items-center h-10 px-4 mt-1 rounded-t-lg transition-all border-b-2 cursor-pointer whitespace-nowrap",
                                    activeTabId === tab.id
                                        ? "bg-white border-primary text-primary font-medium"
                                        : "bg-transparent border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                                )}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <span className="text-sm px-2">{tab.title}</span>
                                {tab.id !== 'dashboard' && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeTab(tab.id);
                                        }}
                                        className="ml-1 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-slate-200 transition-all"
                                    >
                                        <X size={12} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </header>

                {/* Dynamic Content */}
                <div className="flex-grow overflow-y-auto p-6 scroll-smooth">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTabId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <DynamicComponent componentName={tabs.find((t: any) => t.id === activeTabId)?.component || 'DashboardContent'} />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

// Component Switcher
const DynamicComponent = ({ componentName }: { componentName: string }) => {
    switch (componentName) {
        case 'DashboardContent':
            return <DashboardPlaceholder />;
        case 'UserManagement':
            return <UserManagement />;
        case 'Transactions':
            return <Placeholder title="Daftar Transaksi" description="Lihat dan proses pesanan laundry masuk." />;
        case 'Services':
            return <Placeholder title="Layanan & Harga" description="Atur jenis layanan dan tarif laundry." />;
        case 'Settings':
            return <Placeholder title="Pengaturan App" description="Konfigurasi aplikasi dan profil admin." />;
        case 'Profile':
            return <Profile />;
        default:
            return <div className="p-8 text-center text-slate-500 font-medium">Coming Soon</div>;
    }
};

const DashboardPlaceholder = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { label: 'Total Pesanan', value: '128', icon: ShoppingCart, color: 'blue' },
                { label: 'Pelanggan Baru', value: '12', icon: Users, color: 'green' },
                { label: 'Pendapatan (Harian)', value: 'Rp 450k', icon: LayoutDashboard, color: 'purple' },
                { label: 'Selesai', value: '84', icon: Package, color: 'orange' },
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
                    <div className="mt-4 flex items-center text-xs">
                        <span className="text-green-600 font-bold mr-1">+12%</span>
                        <span className="text-slate-400 font-medium">vs bulan lalu</span>
                    </div>
                </Card>
            ))}
        </div>

        <Card className="p-6 h-96 flex items-center justify-center border-dashed border-2">
            <div className="text-center">
                <LayoutDashboard className="mx-auto text-slate-300 mb-4" size={48} />
                <h3 className="text-lg font-bold text-slate-800">Visualisasi Data</h3>
                <p className="text-slate-500">Statistik transaksi akan muncul di sini</p>
            </div>
        </Card>
    </div>
)

const Placeholder = ({ title, description }: { title: string, description: string }) => (
    <div className="space-y-6">
        <div className="flex justify-between items-end mb-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                <p className="text-slate-500">{description}</p>
            </div>
            <Button>Tambah Data</Button>
        </div>
        <Card className="min-h-[400px] flex flex-col items-center justify-center p-12 text-center bg-slate-50/30">
            <Package size={64} className="text-slate-200 mb-4" />
            <h3 className="text-xl font-bold text-slate-400">Belum Ada Data</h3>
            <p className="text-slate-500 max-w-xs mx-auto mt-2">Data Anda akan muncul di tabel ini setelah Anda mulai menambahkannya.</p>
            <Button variant="outline" className="mt-6">Refresh Halaman</Button>
        </Card>
    </div>
)
