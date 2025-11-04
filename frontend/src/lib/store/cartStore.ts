import {create} from "zustand";
import {CartItem, CartItemPayload} from "@/types";
import { persist } from "zustand/middleware";


interface CertState {
    cartItems: CartItem[];

    addItemToCart: (itemPayload: CartItemPayload) => void;
    deleteCartItem: (id: string) => void;
    deleteAllCartItems: () => void;
    getCartCount: () => number;
}

export const useCartStore = create<CertState>()(
    persist(
        (set, get) => ({
            cartItems: [],

            addItemToCart: (itemPayload) => {
                set((state) => {
                    const existing = state.cartItems.find((i) => i.id === itemPayload.id);
                    if (existing) {
                        return {
                            cartItems: state.cartItems.map((i) =>
                                i.id === itemPayload.id ? { ...i, quantity: i.quantity + 1 } : i
                            ),
                        };
                    }
                    return { cartItems: [...state.cartItems, { ...itemPayload, quantity: 1 }] };
                });
            },

            deleteCartItem: (id) => {
                set((state) => ({ cartItems: state.cartItems.filter((i) => i.id !== id) }));
            },

            deleteAllCartItems: () => set({ cartItems: [] }),

            getCartCount: () => {
                return get().cartItems.reduce((sum, i) => sum + i.quantity, 0);
            },
        }),
        {
            name: 'cert-state',
            partialize: (state) => ({ cartItems: state.cartItems }),
        }
    )
)