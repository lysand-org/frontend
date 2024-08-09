import { create } from "zustand";
import type { Identity } from "~/types/identities";

interface IdentitiesState {
    identities: Identity[];
    setIdentities: (newIdentities: Identity[]) => void;
    addIdentity: (identity: Identity) => void;
    updateIdentity: (identity: Identity) => void;
    removeIdentity: (id: string) => void;
}

export const useIdentities = create<IdentitiesState>((set) => ({
    identities: [],
    setIdentities: (newIdentities) => set({ identities: newIdentities }),
    addIdentity: (identity) =>
        set((state) => ({ identities: [...state.identities, identity] })),
    updateIdentity: (identity) =>
        set((state) => ({
            identities: state.identities.map((i) =>
                i.id === identity.id ? identity : i,
            ),
        })),
    removeIdentity: (id) =>
        set((state) => ({
            identities: state.identities.filter((i) => i.id !== id),
        })),
}));
