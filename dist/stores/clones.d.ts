import type { AnyData, MakeCopyOptions } from '../types.js';
import type { CloneOptions, beforeWriteFn, onReadFn } from './types.js';
import type { StorageMapUtils } from './storage.js';
export interface UseServiceClonesOptions<M extends AnyData> {
    itemStorage: StorageMapUtils<M>;
    tempStorage: StorageMapUtils<M>;
    onRead?: onReadFn<M>;
    beforeWrite?: beforeWriteFn<M>;
    makeCopy?: (item: M, data: AnyData, { isClone }: MakeCopyOptions) => M;
}
export declare function useServiceClones<M extends AnyData>(options: UseServiceClonesOptions<M>): {
    cloneStorage: {
        byId: import("../types.js").ById<M>;
        list: import("vue-demi").ComputedRef<M[]>;
        ids: import("vue-demi").ComputedRef<string[]>;
        getId: (item: M) => string;
        clear: () => void;
        has: (item: M) => boolean;
        hasItem: (id: import("@feathersjs/feathers").Id) => boolean;
        get: (item: M) => M;
        getItem: (id: import("@feathersjs/feathers").Id) => M;
        set: (item: M) => M;
        /**
         * If a clone exists, resets the clone to match the item or temp
         * If a clone does not exist, writes the item as the clone.
         * @param item
         * @param data
         * @returns
         */
        setItem: (id: import("@feathersjs/feathers").Id, item: M) => M;
        remove: (item: M) => boolean;
        removeItem: (id: import("@feathersjs/feathers").Id) => boolean;
        getKeys: () => string[];
        merge: (item: M) => M;
    };
    clone: (item: M, data?: {}, options?: CloneOptions) => M;
    commit: (item: M, data?: Partial<M>) => M;
    reset: (item: M, data?: {}) => M;
    markAsClone: (item: M) => M;
};
