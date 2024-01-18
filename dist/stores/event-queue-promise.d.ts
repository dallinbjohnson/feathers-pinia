type EventName = 'created' | 'updated' | 'patched' | 'removed';
export declare function makeGetterName(event: EventName): string;
export declare function makeState(event: EventName): {
    promise: null;
    isResolved: boolean;
    getter: string;
};
export declare function resetState(): void;
/**
 * Creates or reuses a promise for each event type, like "created". The promise
 * resolves when the matching `isPending` attribute, like "isCreatePending" becomes
 * false.
 * @param store
 * @param event
 * @returns
 */
export declare function useQueuePromise(store: any, event: EventName): Promise<any>;
export {};
