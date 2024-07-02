import { PaginationState, UpdatePaginationForQueryOptions } from './types.js';
import { Params, Query, QueryInfo } from '../types.js';
import { ComputedRef, Ref } from 'vue-demi';

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
