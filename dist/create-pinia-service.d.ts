import type { FeathersService, Id, Paginated, PaginationOptions } from '@feathersjs/feathers';
import type { MaybeRef } from '@vueuse/core';
import type { ComputedRef } from 'vue-demi';
import type { UseFindOptions, UseFindParams, UseGetParams } from './use-find-get/index.js';
import type { AnyData, Params, Query } from './types.js';
import type { ServiceInstance } from './modeling/index.js';
interface PiniaServiceOptions {
    servicePath: string;
    store: any;
}
type SvcResult<S extends FeathersService> = S extends {
    get: (...args: any[]) => Promise<infer T>;
} ? T : never;
type SvcParams<S extends FeathersService> = (S extends {
    find: (params: infer T) => any;
} ? T : never) & Params<Query>;
type SvcData<S extends FeathersService> = S extends {
    create: (data: (infer T)[]) => any;
} ? T : never;
type SvcPatchData<S extends FeathersService> = S extends {
    patch: (id: any, data: infer T) => any;
} ? T : never;
type SvcModel<S extends FeathersService> = ServiceInstance<SvcResult<S>>;
export declare class PiniaService<Svc extends FeathersService> {
    service: Svc;
    options: PiniaServiceOptions;
    store: any;
    servicePath: string;
    constructor(service: Svc, options: PiniaServiceOptions);
    /**
     * Prepare new "instances" outside of store
     *
     * Functionally upgrades plain data to a service model "instance".
     * - flags each record with `__isSetup` to avoid duplicate work.
     */
    new(data?: Partial<SvcResult<Svc>>): SvcModel<Svc>;
    /**
     * finds records from the API server by query. Each record is reactive. Lists are non reactive.
     * For reactive lists, use `findInStore`.
     */
    find(params?: MaybeRef<SvcParams<Svc> & {
        paginate?: PaginationOptions;
    }>): Promise<Paginated<SvcModel<Svc>>>;
    find(params?: MaybeRef<SvcParams<Svc> & {
        paginate: false;
    }>): Promise<SvcModel<Svc>[]>;
    find(params?: MaybeRef<SvcParams<Svc>>): Promise<Paginated<SvcModel<Svc>> | SvcModel<Svc>[]>;
    find(params?: MaybeRef<SvcParams<Svc>>): Promise<Paginated<SvcModel<Svc>> | SvcModel<Svc>[]>;
    /**
     * finds a single record from the API server by query. The record is reactive.
     */
    findOne(params?: MaybeRef<SvcParams<Svc>>): Promise<SvcModel<Svc>>;
    /**
     * count records on the API server by query. Returns the number of matching records.
     */
    count(params?: MaybeRef<SvcParams<Svc>>): Promise<Paginated<never>>;
    /**
     * retrieve a record from the API server by id. The record is reactive.
     */
    get(id: Id, params?: MaybeRef<SvcParams<Svc>>): Promise<SvcModel<Svc>>;
    /**
     * create a record on the API server.
     */
    create(data: SvcData<Svc>, params?: MaybeRef<SvcParams<Svc>>): Promise<SvcModel<Svc>>;
    /**
     * patch a record on the API server.
     */
    patch(id: Id, data: SvcPatchData<Svc>, params?: MaybeRef<SvcParams<Svc>>): Promise<SvcModel<Svc>>;
    patch(id: null, data: SvcPatchData<Svc>, params: MaybeRef<SvcParams<Svc>>): Promise<SvcModel<Svc>[]>;
    /**
     * remove a record from the API server.
     */
    remove(id: MaybeRef<Id>, params?: MaybeRef<SvcParams<Svc>>): Promise<SvcModel<Svc>>;
    remove(id: MaybeRef<null>, params: MaybeRef<SvcParams<Svc>>): Promise<SvcModel<Svc>[]>;
    /**
     * find records in the local store. The returned list and records are reactive.
     */
    findInStore(params?: MaybeRef<SvcParams<Svc> & {
        paginate?: PaginationOptions;
    }>): Paginated<SvcModel<Svc>>;
    findInStore(params?: MaybeRef<SvcParams<Svc> & {
        paginate: false;
    }>): SvcModel<Svc>[];
    findInStore(params?: MaybeRef<SvcParams<Svc>>): Paginated<SvcModel<Svc>> | SvcModel<Svc>[];
    findInStore(params?: MaybeRef<SvcParams<Svc>>): Paginated<SvcModel<Svc>> | SvcModel<Svc>[];
    /**
     * find a single record in the local store by query.
     */
    findOneInStore(params?: MaybeRef<SvcParams<Svc>>): ComputedRef<SvcModel<Svc>>;
    /**
     * count records matching a query in the store.
     */
    countInStore(params?: MaybeRef<SvcParams<Svc>>): Paginated<never>;
    /**
     * get a single record from the store by id
     */
    getFromStore(id: MaybeRef<undefined | null>, params: MaybeRef<SvcParams<Svc>>): ComputedRef<SvcModel<Svc>>;
    getFromStore(id: MaybeRef<Id>, params?: MaybeRef<SvcParams<Svc>>): ComputedRef<SvcModel<Svc>>;
    /**
     * creates or adds an item to the store.
     */
    createInStore(data: SvcData<Svc>): SvcModel<Svc>;
    /**
     * patches an item in the store
     */
    patchInStore(id: MaybeRef<Id | SvcResult<Svc>>, data: SvcPatchData<Svc>, params?: MaybeRef<SvcParams<Svc>>): SvcModel<Svc>;
    patchInStore(id: MaybeRef<null | SvcResult<Svc>[]>, data: SvcPatchData<Svc>, params: MaybeRef<SvcPatchData<Svc>>): SvcModel<Svc>[];
    /**
     * removes one or more items from the store.
     */
    removeFromStore(id: Id, params?: MaybeRef<SvcParams<Svc>>): SvcModel<Svc>;
    removeFromStore(id: undefined | null, params: MaybeRef<SvcParams<Svc>>): SvcModel<Svc>[];
    useFind(params: ComputedRef<UseFindParams | null>, options?: UseFindOptions): {
        paramsWithPagination: Params<Query>;
        isSsr: boolean;
        qid: string;
        data: SvcModel<Svc>[];
        allLocalData: SvcModel<Svc>[];
        total: number;
        limit: number;
        skip: number;
        currentQuery: import("./types.js").ExtendedQueryInfo;
        cachedQuery: import("./types.js").ExtendedQueryInfo;
        latestQuery: import("./types.js").ExtendedQueryInfo;
        previousQuery: import("./types.js").ExtendedQueryInfo;
        find: () => Promise<void>;
        request: Promise<import("./types.js").Paginated<SvcModel<Svc>>> | null;
        requestCount: number;
        queryWhen: (queryWhenFn: () => boolean) => void;
        isPending: boolean;
        haveBeenRequested: boolean;
        haveLoaded: boolean;
        error: any;
        clearError: () => void;
        pageCount: number;
        currentPage: number;
        canPrev: boolean;
        canNext: boolean;
        next: () => Promise<void>;
        prev: () => Promise<void>;
        toStart: () => Promise<void>;
        toEnd: () => Promise<void>;
        toPage: (page: number) => Promise<void>;
    };
    useGet(id: MaybeRef<Id | null>, params?: MaybeRef<UseGetParams>): {
        params: UseGetParams;
        isSsr: boolean;
        data: SvcModel<Svc> | null;
        ids: Id[];
        getFromStore: any;
        get: () => Promise<AnyData>;
        request: {
            then: <TResult1 = AnyData, TResult2 = never>(onfulfilled?: ((value: AnyData) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined) => Promise<TResult1 | TResult2>;
            catch: <TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined) => Promise<AnyData | TResult>;
            finally: (onfinally?: (() => void) | null | undefined) => Promise<AnyData>;
            readonly [Symbol.toStringTag]: string;
        } | null;
        requestCount: number;
        queryWhen: (_queryWhenFn: () => boolean) => void;
        isPending: boolean;
        hasBeenRequested: boolean;
        hasLoaded: boolean;
        error: any;
        clearError: () => null;
    };
    useGetOnce(_id: MaybeRef<Id | null>, params?: MaybeRef<UseGetParams>): {
        params: UseGetParams;
        isSsr: boolean;
        data: SvcModel<Svc> | null;
        ids: Id[];
        getFromStore: any;
        get: () => Promise<AnyData>;
        request: {
            then: <TResult1 = AnyData, TResult2 = never>(onfulfilled?: ((value: AnyData) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined) => Promise<TResult1 | TResult2>;
            catch: <TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined) => Promise<AnyData | TResult>;
            finally: (onfinally?: (() => void) | null | undefined) => Promise<AnyData>;
            readonly [Symbol.toStringTag]: string;
        } | null;
        requestCount: number;
        queryWhen: (_queryWhenFn: () => boolean) => void;
        isPending: boolean;
        hasBeenRequested: boolean;
        hasLoaded: boolean;
        error: any;
        clearError: () => null;
    };
    on(eventName: string | symbol, listener: (...args: any[]) => void): FeathersService;
    emit(eventName: string | symbol, ...args: any[]): boolean;
    removeListener(eventName: string | symbol, listener: (...args: any[]) => void): FeathersService;
}
export {};
