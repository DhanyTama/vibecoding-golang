import { create } from 'zustand';

interface Tab {
    id: string;
    title: string;
    component: string;
}

interface AppState {
    user: any | null;
    tabs: Tab[];
    activeTabId: string;
    isSidebarOpen: boolean;
    setUser: (user: any) => void;
    setSidebarOpen: (open: boolean) => void;
    addTab: (tab: Tab) => void;
    removeTab: (id: string) => void;
    setActiveTab: (id: string) => void;
    logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    tabs: [{ id: 'dashboard', title: 'Dashboard', component: 'DashboardContent' }],
    activeTabId: 'dashboard',
    isSidebarOpen: true,
    setUser: (user) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
        set({ user });
    },
    setSidebarOpen: (open) => set({ isSidebarOpen: open }),
    addTab: (tab) => set((state) => {
        if (state.tabs.find((t) => t.id === tab.id)) {
            return { activeTabId: tab.id };
        }
        return { tabs: [...state.tabs, tab], activeTabId: tab.id };
    }),
    removeTab: (id) => set((state) => {
        if (id === 'dashboard') return state; // Don't remove dashboard
        const newTabs = state.tabs.filter((t) => t.id !== id);
        const newActiveId = state.activeTabId === id ? newTabs[newTabs.length - 1].id : state.activeTabId;
        return { tabs: newTabs, activeTabId: newActiveId };
    }),
    setActiveTab: (id) => set({ activeTabId: id }),
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, tabs: [{ id: 'dashboard', title: 'Dashboard', component: 'DashboardContent' }], activeTabId: 'dashboard' });
    },
}));
