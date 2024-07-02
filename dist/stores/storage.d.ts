import { AssignFn, beforeWriteFn, onReadFn } from './types.js';
import { AnyData, ById } from '../types.js';
import { Ref } from 'vue-demi';
import { Id } from '@feathersjs/feathers';

interface UseServiceStorageOptions<M extends AnyData> {
    getId: (item: M) => string;
    onRead?: onReadFn<M>;
    beforeWrite?: beforeWriteFn<M>;
    assign?: AssignFn<M>;
}
export type StorageMapUtils<M extends AnyData> = ReturnType<typeof useServiceStorage<M>>;
/**
 * General storage adapter
 */
export declare function useServiceStorage<M extends AnyData>({ getId, onRead, beforeWrite, assign, }: UseServiceStorageOptions<M>): {
    byId: Ref<ById<M>>;
    list: import('vue-demi').ComputedRef<M[]>;
    ids: import('vue-demi').ComputedRef<string[]>;
    getId: (item: M) => string;
    clear: () => void;
    has: (item: M) => boolean;
    hasItem: (id: Id) => boolean;
    get: (item: M) => M;
    getItem: (id: Id) => M;
    set: (item: M) => M;
    setItem: (id: Id, item: M) => M;
    remove: (item: M) => boolean;
    removeItem: (id: Id) => boolean;
    getKeys: () => string[];
    merge: (item: M) => M;
};
export {};
