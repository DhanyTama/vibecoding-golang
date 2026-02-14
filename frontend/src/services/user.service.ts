import { api } from '../lib/api';

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
}

export interface UserListResponse {
    status: string;
    data: {
        users: User[];
        meta: {
            total: number;
            page: number;
            limit: number;
        };
    };
}

export const userService = {
    getUsers: async (params: {
        page?: number;
        limit?: number;
        search?: string;
        role?: string;
        status?: 'active' | 'archived' | 'all';
        sort_by?: string;
        order?: 'asc' | 'desc';
    }) => {
        const response = await api.get<UserListResponse>('/users', { params });
        return response.data;
    },

    getUser: async (id: number) => {
        const response = await api.get<{ status: string; data: User }>(`/users/${id}`);
        return response.data;
    },

    createUser: async (data: Partial<User> & { password?: string }) => {
        const response = await api.post<{ status: string; message: string; data: User }>('/users', data);
        return response.data;
    },

    updateUser: async (id: number, data: Partial<User>) => {
        const response = await api.put<{ status: string; message: string; data: User }>(`/users/${id}`, data);
        return response.data;
    },

    archiveUser: async (id: number) => {
        const response = await api.delete<{ status: string; message: string }>(`/users/${id}`);
        return response.data;
    },

    restoreUser: async (id: number) => {
        const response = await api.post<{ status: string; message: string }>(`/users/${id}/restore`);
        return response.data;
    },

    deletePermanent: async (id: number) => {
        const response = await api.delete<{ status: string; message: string }>(`/users/${id}/permanent`);
        return response.data;
    }
};
