import { create } from "zustand";
import { persist } from "zustand/middleware/persist";

interface CertItemsData{
    productId: string;
    productCounts: number;
}

interface CertState {
    certItems: CertItemsData[],
    globalCount: number;

    addItemToCert: () => void,
    deleteCertItem: () => void,
    deleteAllCertItems: () => void,
}


export const useCertStore = create<CertState>()(

)