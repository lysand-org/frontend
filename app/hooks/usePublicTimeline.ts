import type { LysandClient } from "@lysand-org/client";
import type { Status } from "@lysand-org/client/types";
import { type TimelineOptions, useTimeline } from "./useTimeline";

/**
 * Custom hook to manage public timeline
 * @param {LysandClient} client
 * @param {Partial<TimelineOptions<Status>>} options
 * @returns {object}
 */
export function usePublicTimeline(
    client: LysandClient,
    options: Partial<TimelineOptions<Status>> = {},
) {
    return useTimeline(client, {
        fetchFunction: (client, opts) => client.getPublicTimeline(opts),
        ...options,
    });
}
