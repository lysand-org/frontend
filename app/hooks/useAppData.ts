import type { ApplicationData } from "@lysand-org/client/types";
import { create } from "zustand";

interface AppDataState {
    appData: ApplicationData | null;
    setAppData: (data: ApplicationData | null) => void;
}

export const useAppData = create<AppDataState>((set) => ({
    appData: null,
    setAppData: (data) => set({ appData: data }),
}));
