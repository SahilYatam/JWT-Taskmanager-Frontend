import { create } from "zustand";
import { authApi } from "../api/auth";

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;

    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    fetchMe: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,

    login: async (email, password) => {
        set({ loading: true });

        try {
            const data = await authApi.loginUser({ email, password });
            set({ user: data.user, isAuthenticated: true });
        } finally {
            set({ loading: false });
        }
    },

    signup: async (name, email, password) => {
        set({ loading: true });

        try {
            const data = await authApi.signupUser({ name, email, password });
            set({ user: data.user, isAuthenticated: true });
        } finally {
            set({ loading: false });
        }
    },

    logout: async () => {
        await authApi.logoutUser(); // clears cookie in backend
        set({ user: null, isAuthenticated: false });
    },

    fetchMe: async () => {
        try {
            const data = await authApi.getMe();
            set({ user: data.user, isAuthenticated: true });
        } catch {
            set({ user: null, isAuthenticated: false });
        } finally{
            set({loading: false})
        }
    },
}));
