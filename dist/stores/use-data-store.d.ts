import type { Query } from '@feathersjs/feathers';
import type { MaybeRef } from '@vueuse/core';
import type { AnyData } from '../types.js';
export interface UseDataStoreOptions {
    idField: string;
    ssr?: MaybeRef<boolean>;
    customSiftOperators?: Record<string, any>;
    setupInstance?: any;
}
export declare function useDataStore<M extends AnyData, Q extends Query>(_options: UseDataStoreOptions): {
    new: <N extends M>(this: any, data: N) => any;
    idField: string;
    isSsr: import("vue-demi").ComputedRef<boolean>;
    itemsById: import("vue-demi").Ref<import("../types.js").ById<M>>;
    items: import("vue-demi").ComputedRef<M[]>;
    itemIds: import("vue-demi").ComputedRef<string[]>;
    tempsById: import("vue-demi").Ref<import("../types.js").ById<M>>;
    temps: import("vue-demi").ComputedRef<M[]>;
    tempIds: import("vue-demi").ComputedRef<string[]>;
    clonesById: import("vue-demi").Ref<import("../types.js").ById<M>>;
    clones: import("vue-demi").ComputedRef<M[]>;
    cloneIds: import("vue-demi").ComputedRef<string[]>;
    clone: (item: M, data?: {}, options?: import("./types.js").CloneOptions) => M;
    commit: (item: M, data?: Partial<M>) => M;
    reset: (item: M, data?: {}) => M;
    findInStore: (_params: MaybeRef<import("../types.js").Params<Q>>) => {
        total: number;
        limit: any;
        skip: any;
        data: any[];
    };
    findOneInStore: (params: MaybeRef<import("../types.js").Params<Q>>) => import("vue-demi").ComputedRef<any>;
    countInStore: (params: MaybeRef<import("../types.js").Params<Q>>) => import("vue-demi").ComputedRef<number>;
    createInStore: <N = MaybeRef<M | M[]>>(data: N) => N;
    getFromStore: (_id: MaybeRef<import("@feathersjs/feathers").Id | null>, params?: import("../types.js").Params<Q> | undefined) => import("vue-demi").ComputedRef<M | null>;
    patchInStore: (_idOrData: MaybeRef<import("@feathersjs/feathers").Id | M | M[] | null>, _data?: MaybeRef<AnyData>, _params?: MaybeRef<import("../types.js").Params<Q>>) => any;
    removeFromStore: (data: M | M[] | null, params?: import("../types.js").Params<Q> | undefined) => M | M[] | null;
    clearAll: () => void;
};
