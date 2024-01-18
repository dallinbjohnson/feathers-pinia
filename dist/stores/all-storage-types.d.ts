import type { AnyData } from '../types.js';
interface UseAllStorageOptions {
    getIdField: (val: AnyData) => any;
    setupInstance: any;
}
export declare function useAllStorageTypes<M extends AnyData>(options: UseAllStorageOptions): {
    itemStorage: {
        byId: import("../types.js").ById<M>;
        list: import("vue").ComputedRef<M[]>;
        ids: import("vue").ComputedRef<string[]>;
        getId: (item: M) => string;
        clear: () => void;
        has: (item: M) => boolean;
        hasItem: (id: import("@feathersjs/feathers").Id) => boolean;
        get: (item: M) => M;
        getItem: (id: import("@feathersjs/feathers").Id) => M;
        set: (item: M) => M;
        setItem: (id: import("@feathersjs/feathers").Id, item: M) => M;
        remove: (item: M) => boolean;
        removeItem: (id: import("@feathersjs/feathers").Id) => boolean;
        getKeys: () => string[];
        merge: (item: M) => M;
    };
    tempStorage: {
        byId: import("../types.js").ById<M>;
        list: import("vue").ComputedRef<M[]>;
        ids: import("vue").ComputedRef<string[]>;
        getId: (item: M) => string;
        clear: () => void;
        has: (item: M) => boolean;
        hasItem: (id: import("@feathersjs/feathers").Id) => boolean;
        get: (item: M) => M;
        getItem: (id: import("@feathersjs/feathers").Id) => M;
        set: (item: M) => M;
        setItem: (id: import("@feathersjs/feathers").Id, item: M) => M;
        remove: (item: M) => boolean;
        removeItem: (id: import("@feathersjs/feathers").Id) => boolean;
        getKeys: () => string[];
        merge: (item: M) => M;
    };
    cloneStorage: {
        byId: import("../types.js").ById<M>;
        list: import("vue").ComputedRef<M[]>;
        ids: import("vue").ComputedRef<string[]>;
        getId: (item: M) => string;
        clear: () => void;
        has: (item: M) => boolean;
        hasItem: (id: import("@feathersjs/feathers").Id) => boolean;
        get: (item: M) => M;
        getItem: (id: import("@feathersjs/feathers").Id) => M;
        set: (item: M) => M;
        setItem: (id: import("@feathersjs/feathers").Id, item: M) => M;
        remove: (item: M) => boolean;
        removeItem: (id: import("@feathersjs/feathers").Id) => boolean;
        getKeys: () => string[];
        merge: (item: M) => M;
    };
    clone: (item: M, data?: {}, options?: import("./types.js").CloneOptions) => M;
    commit: (item: M, data?: Partial<M>) => M;
    reset: (item: M, data?: {}) => M;
    addItemToStorage: (item: M) => M;
};
export {};
