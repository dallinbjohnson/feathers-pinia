import { StorageMapUtils } from './storage.js';
import { beforeWriteFn, onReadFn } from './types.js';
import { AnyData } from '../types.js';

interface UseServiceTempsOptions<M extends AnyData> {
    getId: (item: M) => string;
    itemStorage: StorageMapUtils<M>;
    onRead?: onReadFn<M>;
    beforeWrite?: beforeWriteFn<M>;
}
export declare function useServiceTemps<M extends AnyData>(options: UseServiceTempsOptions<M>): {
    tempStorage: {
        byId: import('vue').Ref<import('../types.js').ById<M>>;
        list: import('vue').ComputedRef<M[]>;
        ids: import('vue').ComputedRef<string[]>;
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
    moveTempToItems: (data: M) => M;
};
export {};
