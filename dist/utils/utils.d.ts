import { AnyData, AnyDataOrArray, DiffDefinition, Params, Query, QueryInfo } from '../types.js';
import { Ref } from 'vue-demi';
import { MaybeRef } from '@vueuse/core';

export declare function createSymbol(name: string): string | symbol;
export declare const SERVICE: string | symbol;
interface GetExtendedQueryInfoOptions {
    queryInfo: QueryInfo;
    service: any;
    store: any;
    qid: Ref<string>;
}
export declare function getExtendedQueryInfo({ queryInfo, service, store, qid }: GetExtendedQueryInfoOptions): {
    ids: any;
    items: AnyData | import('../index.js').ServiceInstance<AnyData>[];
    total: any;
    queriedAt: any;
    queryState: any;
    ssr: any;
    qid: string;
    query: Query;
    queryId: string;
    queryParams: Query;
    pageParams: {
        $limit: MaybeRef<number>;
        $skip: MaybeRef<number> | undefined;
    } | undefined;
    pageId: string | undefined;
    isExpired: boolean;
} | null;
export declare function hasOwn(obj: AnyData, prop: string): boolean;
/**
 *
 * @param data item or array of items
 * @returns object with { items[], isArray } where isArray is a boolean of if the data was an array.
 */
export declare function getArray<T>(data: T | T[]): {
    items: T[];
    isArray: boolean;
};
export declare function pickDiff(obj: any, diffDef: DiffDefinition): any;
export declare function diff(dest: AnyData, source: AnyData, diffDef?: DiffDefinition): AnyData;
/**
 * Restores tempIds to the records returned from the server. The tempIds need to be
 * temporarily put back in place in order to migrate the objects from the tempsById
 * into the itemsById. A shallow copy of the object
 *
 * Note when data is an array, it doesn't matter if the server
 * returns the items in the same order. It's only important that all of the correct
 * records are moved from tempsById to itemsById
 *
 * @param data item(s) before being passed to the server
 * @param responseData items(s) returned from the server
 */
export declare function restoreTempIds(data: AnyDataOrArray<any>, resData: AnyDataOrArray<any>, tempIdField?: string): any;
/**
 * Get the id from a record in this order:
 *   1. the `idField`
 *   2. id
 *   3. _id
 * @param item
 * @param idField
 */
export declare function getId(item: any, idField: string): any;
/**
 * Assures params exist.
 * @param params existing params
 */
export declare function getParams(params?: MaybeRef<Params<Query>>): Params<Query>;
export declare function timeout(ms: number): Promise<unknown>;
export {};
