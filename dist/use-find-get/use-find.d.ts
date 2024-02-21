import type { ComputedRef, Ref, UnwrapNestedRefs, WritableComputedRef } from 'vue-demi';
import type { AnyData, ExtendedQueryInfo, Paginated, Params, Query } from '../types.js';
import type { UseFindGetDeps, UseFindOptions, UseFindParams } from './types.js';
export type UseFindReturn<M = AnyData> = UnwrapNestedRefs<{
    paramsWithPagination: ComputedRef<Params<Query>>;
    isSsr: ComputedRef<boolean>;
    qid: WritableComputedRef<string>;
    data: ComputedRef<M[]>;
    allLocalData: ComputedRef<M[]>;
    total: ComputedRef<number>;
    limit: Ref<number>;
    skip: number;
    currentQuery: ComputedRef<ExtendedQueryInfo | null>;
    cachedQuery: ComputedRef<ExtendedQueryInfo | null>;
    latestQuery: ComputedRef<ExtendedQueryInfo | null>;
    previousQuery: ComputedRef<ExtendedQueryInfo | null>;
    find: () => Promise<void>;
    request: Ref<Promise<Paginated<M>> | null>;
    requestCount: Ref<number>;
    queryWhen: (queryWhenFn: () => boolean) => void;
    isPending: ComputedRef<boolean>;
    haveBeenRequested: ComputedRef<boolean>;
    haveLoaded: ComputedRef<boolean>;
    error: ComputedRef<any>;
    clearError: () => void;
    pageCount: Ref<number>;
    currentPage: Ref<number>;
    canPrev: ComputedRef<boolean>;
    canNext: ComputedRef<boolean>;
    next: () => Promise<void>;
    prev: () => Promise<void>;
    toStart: () => Promise<void>;
    toEnd: () => Promise<void>;
    toPage: (page: number) => Promise<void>;
}>;
export declare function useFind<M = AnyData>(params: ComputedRef<UseFindParams | null>, options: UseFindOptions | undefined, deps: UseFindGetDeps): UseFindReturn<M>;
