import { StorageMapUtils } from './storage.js';
import { CloneOptions, beforeWriteFn, onReadFn } from './types.js';
import { AnyData, MakeCopyOptions } from '../types.js';

export interface UseServiceClonesOptions<M extends AnyData> {
    itemStorage: StorageMapUtils<M>;
    tempStorage: StorageMapUtils<M>;
    onRead?: onReadFn<M>;
    beforeWrite?: beforeWriteFn<M>;
    makeCopy?: (item: M, data: AnyData, { isClone }: MakeCopyOptions) => M;
}
export declare function useServiceClones<M extends AnyData>(options: UseServiceClonesOptions<M>): {
    cloneStorage: {
        byId: import('vue-demi').Ref<import('../types.js').ById<M>>;
        list: import('vue-demi').ComputedRef<M[]>;
        ids: import('vue-demi').ComputedRef<string[]>;
        getId: (item: M) => string;
        clear: () => void;
        has: (item: M) => boolean;
        hasItem: (id: import('@feathersjs/feathers').Id) => boolean;
        get: (item: M) => M;
        getItem: (id: import('@feathersjs/feathers').Id) => M;
        set: (item: M) => M;
        setItem: (id: import('@feathersjs/feathers').Id, item: M) => M;
        remove: (item: M) => boolean;
        removeItem: (id: import('@feathersjs/feathers').Id) => boolean;
        getKeys: () => string[];
        merge: (item: M) => M;
    };
    clone: (item: M, data?: {}, options?: CloneOptions) => M;
    commit: (item: M, data?: Partial<M>) => M;
    reset: (item: M, data?: {}) => M;
    markAsClone: (item: M) => M;
};
