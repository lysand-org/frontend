import type { LysandClient } from "@lysand-org/client";
import { type RolePermissions, useCurrentIdentity } from "./Identities";

export const useCacheRefresh = (client: MaybeRef<LysandClient | null>) => {
    if (process.server) return;

    const identity = useCurrentIdentity();
    const instance = useInstance();

    // Refresh custom emojis and instance data and me on every reload
    watchEffect(async () => {
        console.info("Refreshing emoji, instance and account cache");
        if (identity.value) {
            toValue(client)
                ?.verifyAccountCredentials()
                .then((res) => {
                    if (identity.value) identity.value.account = res.data;
                })
                .catch((err) => {
                    const code = err.response.status;

                    if (code === 401) {
                        // Reset tokenData
                        identity.value = null;
                        useEvent("notification:new", {
                            type: "error",
                            title: "Your session has expired",
                            message:
                                "You have been logged out. Please log in again.",
                        });
                    }
                });

            toValue(client)
                ?.getInstanceCustomEmojis()
                .then((res) => {
                    if (identity.value) identity.value.emojis = res.data;
                });

            toValue(client)
                ?.getRoles()
                .then((res) => {
                    const roles = res.data;

                    // Get all permissions and deduplicate
                    const permissions = roles
                        .flatMap((r) => r.permissions)
                        .filter((p, i, arr) => arr.indexOf(p) === i);

                    if (identity.value)
                        identity.value.permissions =
                            permissions as unknown as RolePermissions[];
                });
        }

        toValue(client)
            ?.getInstance()
            .then((res) => {
                instance.value = res.data;
            });
    });
};
