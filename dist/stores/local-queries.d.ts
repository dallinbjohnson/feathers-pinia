import { StorageMapUtils } from './storage.js';
import { AnyData, CustomFilter, Params } from '../types.js';
import { Id } from '@feathersjs/feathers';
import { MaybeRef } from '@vueuse/core';

interface UseServiceLocalOptions<M extends AnyData> {
    idField: string;
    itemStorage: StorageMapUtils<M>;
    tempStorage?: StorageMapUtils<M>;
    cloneStorage?: StorageMapUtils<M>;
    addItemToStorage: any;
    whitelist?: string[];
    paramsForServer?: string[];
    customSiftOperators?: Record<string, any>;
    customFilters?: CustomFilter[];
}
export declare function useServiceLocal<M extends AnyData, Q extends AnyData>(options: UseServiceLocalOptions<M>): {
    findInStore: (_params: MaybeRef<Params<Q>>) => {
        total: number;
        limit: any;
        skip: any;
        data: any[];
    };
    findOneInStore: (params: MaybeRef<Params<Q>>) => import('vue-demi').ComputedRef<any>;
    countInStore: (params: MaybeRef<Params<Q>>) => import('vue-demi').ComputedRef<number>;
    getFromStore: (_id: MaybeRef<Id | null>, params?: Params<Q>) => import('vue-demi').ComputedRef<M | null>;
    createInStore: <N = MaybeRef<M | M[]>>(data: N) => N;
    patchInStore: (_idOrData: MaybeRef<M | M[] | Id | null>, _data?: MaybeRef<AnyData>, _params?: MaybeRef<Params<Q>>) => any;
    removeFromStore: (data: M | M[] | null, params?: Params<Q>) => M | M[] | null;
};
export {};
