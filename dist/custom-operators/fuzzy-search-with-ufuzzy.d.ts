import { default as UFuzzy } from '@leeoniya/ufuzzy';

interface uFuzzyParams extends UFuzzy.Options {
    /**
     * The search term.
     */
    search: string;
    /**
     * The fields to search in.
     */
    fields: string[];
    /**
     * Whether sub-parts should be ranked out of order. Defaults to `0`, which is off.
     */
    outOfOrder?: 0 | 1;
    /**
     * The maximum number of items to rank and sort. If more than this many items are found, the
     * results will be returned in the order they are found in the original list and no sorting will
     * be performed. Defaults to 1000.
     */
    sortMax?: number;
    /**
     * When enabled, the ranges for each field will be included in the result items. Defaults to `true`.
     * This will modify the items in place by adding a property with the name specified in `rangesKey`.
     * The property is non-enumerable and will not be included in JSON.stringify. Once the search value
     * is empty, the ranges will be removed from each item.
     */
    includeRanges?: boolean;
    /**
     * When `includeRanges` is enabled, this key will be used to store the ranges for each field. Defaults to `__ranges`.
     */
    rangesKey?: string;
}
export declare function createUFuzzyFilter(ufOptions?: UFuzzy.Options): <M>(items: M[], params: uFuzzyParams, _query: Record<string, any>) => M[];
export {};
