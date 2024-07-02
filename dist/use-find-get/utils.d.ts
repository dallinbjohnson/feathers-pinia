import { UseFindParams } from './types.js';
import { Params, Query } from '../types.js';
import { Ref } from 'vue-demi';
import { MaybeRef } from '@vueuse/core';

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