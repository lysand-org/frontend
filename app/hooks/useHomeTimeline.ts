import type { LysandClient } from "@lysand-org/client";
import type { Status } from "@lysand-org/client/types";
import { type TimelineOptions, useTimeline } from "./useTimeline";

/**
 * Custom hook to manage home timeline
 * @param {LysandClient} client
 * @param {Partial<TimelineOptions<Status>>} options
 * @returns {object}
 */
export function useHomeTimeline(
    client: LysandClient,
    options: Partial<TimelineOptions<Status>> = {},
) {
    return useTimeline(client, {
        fetchFunction: (client, opts) => client.getHomeTimeline(opts),
        ...options,
    });
}
