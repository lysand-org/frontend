import { LysandClient, type Token } from "@lysand-org/client";
import { useMemo } from "react";
import { useCurrentIdentity } from "./useCurrentIdentity";

/**
 * Hook to create a LysandClient instance.
 * @param customToken Optional custom token.
 * @returns A LysandClient instance.
 */
export const useClient = (customToken: Token | null = null) => {
    const { currentIdentity } = useCurrentIdentity();
    const baseUrl = `https://${currentIdentity?.instance.domain}`;

    return useMemo(() => {
        return new LysandClient(
            new URL(baseUrl ?? ""),
            customToken?.access_token ??
                currentIdentity?.tokens.access_token ??
                undefined,
            (error) => {
                // Handle error
                console.error(
                    "An error occurred",
                    error.response.data.error ?? "No error message provided",
                );
            },
        );
    }, [baseUrl, customToken, currentIdentity]);
};
