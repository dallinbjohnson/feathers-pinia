import type { Ref } from 'vue-demi';
interface Options {
    limit: Ref<number>;
    skip: Ref<number>;
    total: Ref<number>;
    request?: any;
}
export declare function usePageData(options: Options): {
    pageCount: import("vue-demi").ComputedRef<number>;
    currentPage: import("vue-demi").WritableComputedRef<number>;
    canPrev: import("vue-demi").ComputedRef<boolean>;
    canNext: import("vue-demi").ComputedRef<boolean>;
    toStart: () => Promise<void>;
    toEnd: () => Promise<void>;
    toPage: (page: number) => Promise<void>;
    next: () => Promise<void>;
    prev: () => Promise<void>;
};
export {};
