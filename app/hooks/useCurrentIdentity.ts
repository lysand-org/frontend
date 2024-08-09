import { create } from "zustand";
import type { Identity } from "~/types/identities";

interface CurrentIdentityState {
    currentIdentity: Identity | null;
    setCurrentIdentity: (identity: Identity | null) => void;
}

export const useCurrentIdentity = create<CurrentIdentityState>((set) => ({
    currentIdentity: null,
    setCurrentIdentity: (identity) => set({ currentIdentity: identity }),
}));
