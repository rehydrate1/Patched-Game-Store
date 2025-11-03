import { create } from "zustand";
import { persist } from "zustand/middleware/persist";

interface AuthUserState {
    id: string;
    userName: string;
    email: string;
}

interface AuthState{
    isAuthenticated: boolean;
    userData: AuthUserState | null;
    isLoading: boolean;

    initialize: () => Promise<void>;
    clear: () => void;
    logout: () => Promise<boolean>;
}


export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({

            isAuthenticated: false,
            userData: null,
            isLoading: false,

            initialize: async () => {
                if (get().isLoading) return;
                set({ isLoading: true });
                try {
                    const response = await fetch('/api/auth/session', {
                        method: 'GET',
                        credentials: 'include',
                        cache: 'no-store',
                    });

                    if (response.ok) {
                        const data = (await response.json()) as { user: AuthUserState };
                        set({ isAuthenticated: true, userData: data.user });
                    } else if (response.status === 401) {
                        set({ isAuthenticated: false, userData: null });
                    } else {
                        // На неожиданные статусы также считаем неавторизованным
                        set({ isAuthenticated: false, userData: null });
                        // Можно залогировать текст ошибки при необходимости
                    }
                } catch (e) {
                    console.error(e)
                    set({ isAuthenticated: false, userData: null });
                } finally {
                    set({ isLoading: false });
                }
            },

            clear: () => set({ isAuthenticated: false, userData: null }),

            logout: async () => {
                try {
                    const resp = await fetch('/api/auth/logout', { method: 'POST' });
                    set({ isAuthenticated: false, userData: null });
                    return resp.ok;
                } catch {
                    set({ isAuthenticated: false, userData: null });
                    return false;
                }
            },
        }),
        {
            name: 'auth-state',
            partialize: () => ({}),
        }
    )
)