import type { Query } from '@feathersjs/feathers';
import type { MaybeRef } from '@vueuse/core';
import type { AnyData } from '../types.js';
export interface UseServiceStoreOptions {
    idField: string;
    servicePath: string;
    defaultLimit?: number;
    whitelist?: string[];
    paramsForServer?: string[];
    skipGetIfExists?: boolean;
    ssr?: MaybeRef<boolean>;
    customSiftOperators?: Record<string, any>;
    setupInstance?: any;
}
export declare function useServiceStore<M extends AnyData, Q extends Query>(_options: UseServiceStoreOptions): {
    eventLocks: {
        created: {
            [key: string]: boolean;
        };
        patched: {
            [key: string]: boolean;
        };
        removed: {
            [key: string]: boolean;
        };
        updated: {
            [key: string]: boolean;
        };
    };
    toggleEventLock: (data: import("../types.js").MaybeArray<import("@feathersjs/feathers").Id>, event: import("./types.js").EventName) => void;
    clearEventLock: (data: import("../types.js").MaybeArray<import("@feathersjs/feathers").Id>, event: import("./types.js").EventName) => void;
    isPending: import("vue-demi").Ref<{
        find: number;
        count: number;
        get: number;
        create: number;
        update: number;
        patch: number;
        remove: number;
    }>;
    createPendingById: import("vue-demi").Ref<Record<string | number | symbol, true>>;
    updatePendingById: import("vue-demi").Ref<Record<string | number | symbol, true>>;
    patchPendingById: import("vue-demi").Ref<Record<string | number | symbol, true>>;
    removePendingById: import("vue-demi").Ref<Record<string | number | symbol, true>>;
    isFindPending: import("vue-demi").ComputedRef<boolean>;
    isCountPending: import("vue-demi").ComputedRef<boolean>;
    isGetPending: import("vue-demi").ComputedRef<boolean>;
    isCreatePending: import("vue-demi").ComputedRef<boolean>;
    isUpdatePending: import("vue-demi").ComputedRef<boolean>;
    isPatchPending: import("vue-demi").ComputedRef<boolean>;
    isRemovePending: import("vue-demi").ComputedRef<boolean>;
    setPending: (method: "find" | "get" | "create" | "update" | "patch" | "remove" | "count", value: boolean) => void;
    setPendingById: (id: import("@feathersjs/feathers").NullableId, method: import("./types.js").RequestTypeById, val: boolean) => void;
    unsetPendingById: (...ids: import("@feathersjs/feathers").NullableId[]) => void;
    clearAllPending: () => void;
    new: <N extends M>(this: any, data: N) => any;
    idField: string;
    servicePath: string;
    isSsr: import("vue-demi").ComputedRef<boolean>;
    defaultLimit: number | undefined;
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
    createInStore: <N_1 = MaybeRef<M | M[]>>(data: N_1) => N_1;
    getFromStore: (_id: MaybeRef<import("@feathersjs/feathers").Id | null>, params?: import("../types.js").Params<Q> | undefined) => import("vue-demi").ComputedRef<M | null>;
    patchInStore: (_idOrData: MaybeRef<import("@feathersjs/feathers").Id | M | M[] | null>, _data?: MaybeRef<AnyData>, _params?: MaybeRef<import("../types.js").Params<Q>>) => any;
    removeFromStore: (data: M | M[] | null, params?: import("../types.js").Params<Q> | undefined) => M | M[] | null;
    clearAll: () => void;
    resultsByQid: Record<string, AnyData>;
    getQid: (qid: string) => AnyData;
    setQid: (qid: string, data: any) => void;
    clearQid: (qid: string) => void;
    clearAllQids: () => void;
    whitelist: string[] | undefined;
    paramsForServer: string[] | undefined;
    pagination: import("vue-demi").Ref<import("./types.js").PaginationState>;
    updatePaginationForQuery: ({ qid, response, query, preserveSsr, }: import("./types.js").UpdatePaginationForQueryOptions) => void;
    unflagSsr: (params: import("../types.js").Params<import("../types.js").Query>) => void;
    getQueryInfo: (_params: import("../types.js").Params<import("../types.js").Query>) => import("../types.js").QueryInfo;
};
