import type { ComputedRef, Ref } from 'vue-demi';
import type { Params, Query, QueryInfo } from '../types.js';
import type { PaginationState, UpdatePaginationForQueryOptions } from './types.js';
export interface UseServicePagination {
    idField: string;
    isSsr: ComputedRef<boolean>;
    defaultLimit?: number;
}
export declare function useServicePagination(options: UseServicePagination): {
    pagination: Ref<PaginationState>;
    updatePaginationForQuery: ({ qid, response, query, preserveSsr, }: UpdatePaginationForQueryOptions) => void;
    unflagSsr: (params: Params<Query>) => void;
    getQueryInfo: (_params: Params<Query>) => QueryInfo;
    clearPagination: () => void;
};
