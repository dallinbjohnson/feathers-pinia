import type { MaybeRef } from '@vueuse/core';
import type { Ref } from 'vue-demi';
import type { Params, Query } from '../types.js';
import type { UseFindParams } from './types.js';
export declare function makeParamsWithoutPage(params: MaybeRef<UseFindParams>): any;
export declare function updateParamsExcludePage(_params: Ref<UseFindParams>, _newParams: MaybeRef<UseFindParams>): void;
export declare function getIdsFromQueryInfo(pagination: any, queryInfo: any): any[];
/**
 * A wrapper for findInStore that can return server-paginated data
 */
export declare function itemsFromPagination(store: any, service: any, params: Params<Query>): any[];
export declare function getAllIdsFromQueryInfo(pagination: any, queryInfo: any): any[];
/**
 * A wrapper for findInStore that can return all server-paginated data
 */
export declare function allItemsFromPagination(store: any, service: any, params: Params<Query>): any[];
