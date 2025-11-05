import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CertItemStructure {
    id: number;
    name: string;
    price: string;
    picture: string;
    quantity: number;
}

interface SertState {
    certItems: CertItemStructure | null ,

    addItem: (itemId: string) => void,
    removeItem: (itemId: string) => void,
    removeAllItems: () => void,
}


export const useSertStore = create<SertState>()(
    persist(
        (set, get) => ({
            certItems: [],

        })
    )
)