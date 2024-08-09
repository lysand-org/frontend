import type { LysandClient, Output } from "@lysand-org/client";
import type { Notification, Status } from "@lysand-org/client/types";
import { useCallback, useEffect, useState } from "react";

/**
 * Timeline options interface
 * @template T
 */
export interface TimelineOptions<T> {
    fetchFunction: (
        client: LysandClient,
        options: object,
    ) => Promise<Output<T[]>>;
    updateInterval?: number;
    limit?: number;
}

/**
 * Custom hook to manage timeline
 * @template T
 * @param {LysandClient} client
 * @param {TimelineOptions<T>} options
 * @returns {object}
 */
export function useTimeline<T extends Status | Notification>(
    client: LysandClient,
    options: TimelineOptions<T>,
) {
    const [items, setItems] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasReachedEnd, setHasReachedEnd] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [nextMaxId, setNextMaxId] = useState<string | undefined>(undefined);
    const [prevMinId, setPrevMinId] = useState<string | undefined>(undefined);

    const fetchItems = useCallback(
        async (direction: "next" | "prev") => {
            if (isLoading || (direction === "next" && hasReachedEnd)) {
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const response = await options.fetchFunction(client, {
                    limit: options.limit || 20,
                    max_id: direction === "next" ? nextMaxId : undefined,
                    min_id: direction === "prev" ? prevMinId : undefined,
                });

                const newItems = response.data.filter(
                    (item: T) =>
                        !items.some((existing) => existing.id === item.id),
                );

                if (direction === "next") {
                    setItems((prevItems) => [...prevItems, ...newItems]);
                    if (newItems.length < (options.limit || 20)) {
                        setHasReachedEnd(true);
                    }
                    if (newItems.length > 0) {
                        setNextMaxId(newItems[newItems.length - 1]?.id);
                    }
                } else {
                    setItems((prevItems) => [...newItems, ...prevItems]);
                    if (newItems.length > 0) {
                        setPrevMinId(newItems[0]?.id);
                    }
                }
            } catch (e) {
                setError(
                    e instanceof Error ? e : new Error("An error occurred"),
                );
            } finally {
                setIsLoading(false);
            }
        },
        [
            client,
            options,
            isLoading,
            hasReachedEnd,
            nextMaxId,
            prevMinId,
            items,
        ],
    );

    const loadNext = useCallback(() => fetchItems("next"), [fetchItems]);
    const loadPrev = useCallback(() => fetchItems("prev"), [fetchItems]);

    const addItem = useCallback((newItem: T) => {
        setItems((prevItems) => [newItem, ...prevItems]);
    }, []);

    const removeItem = useCallback((id: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }, []);

    const updateItem = useCallback((updatedItem: T) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === updatedItem.id ? updatedItem : item,
            ),
        );
    }, []);

    useEffect(() => {
        loadNext();
        const interval = setInterval(loadPrev, options.updateInterval || 30000);
        return () => clearInterval(interval);
    }, [loadNext, loadPrev, options.updateInterval]);

    return {
        items,
        isLoading,
        hasReachedEnd,
        error,
        loadNext,
        loadPrev,
        addItem,
        removeItem,
        updateItem,
    };
}
