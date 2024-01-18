/**
 * Use a counter to track the number of pending queries. Prevents collisions with overlapping queries.
 */
export declare function useCounter(): {
    count: import("vue-demi").Ref<number>;
    add: () => void;
    sub: () => void;
};
