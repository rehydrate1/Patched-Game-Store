import { create } from "zustand";
import { persist } from "zustand/middleware";
import {baseBackendUrl} from "@/lib";
import {AuthBackendResponseStructure, AuthUserState, LoginRequestStructure, RegisterRequestStructure} from "@/types";

interface AuthState{
    userData: AuthUserState | null;
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    isLoading: boolean;

    login: (payload: LoginRequestStructure) => Promise<{ ok: true } | { ok: false; message: string }>;
    register: (payload: RegisterRequestStructure) => Promise<{ ok: true } | { ok: false; message: string }>;

    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({

            userData: null,
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
            isLoading: false,

            login: async (payload: LoginRequestStructure) => {
                if (get().isLoading) return { ok: false, message: "Идёт запрос, подождите..." };
                set({ isLoading: true });

                try {
                    const response = await fetch(`${baseBackendUrl}/auth/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify(payload),
                    });

                    if (!response.ok) {
                        const data = await response.json().catch(() => ({ message: "Ошибка авторизации" }));
                        return { ok: false, message: data?.message || "Ошибка авторизации" };
                    }

                    const data = (await response.json()) as AuthBackendResponseStructure;

                    set({
                        userData: {
                            id: data.id,
                            email: data.email,
                            userName: data.userName,
                            created_at: data.created_at,
                        },
                        accessToken: data.access_token,
                        refreshToken: data.refresh_token,
                        isAuthenticated: true,
                    });

                    return { ok: true };
                } catch (error) {
                    console.error(error);
                    return { ok: false, message: "Не удалось связаться с сервером" };
                } finally {
                    set({ isLoading: false });
                }
            },

            register: async (payload: RegisterRequestStructure) => {
                if (get().isLoading) return { ok: false, message: "Идёт запрос, подождите..." };
                set({ isLoading: true });

                try {
                    const response = await fetch(`${baseBackendUrl}/auth/register`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify(payload),
                    });

                    if (!response.ok) {
                        const data = await response.json().catch(() => ({ message: "Ошибка регистрации" }));
                        return { ok: false, message: data?.message || "Ошибка регистрации" };
                    }

                    const data = (await response.json()) as AuthBackendResponseStructure;

                    set({
                        userData: {
                            id: data.id,
                            email: data.email,
                            userName: data.userName,
                            created_at: data.created_at,
                        },
                        accessToken: data.access_token,
                        refreshToken: data.refresh_token,
                        isAuthenticated: true,
                    });

                    return { ok: true };
                } catch (error) {
                    console.error(error);
                    return { ok: false, message: "Не удалось связаться с сервером" };
                } finally {
                    set({ isLoading: false });
                }
            },


            logout: async () => {
                try {
                    const resp = await fetch('/api/auth/logout', { method: 'POST' });
                    set({ userData: null, accessToken: null, refreshToken: null, isAuthenticated: false });
                    return resp.ok;
                } catch {
                    set({ userData: null, accessToken: null, refreshToken: null, isAuthenticated: false });
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