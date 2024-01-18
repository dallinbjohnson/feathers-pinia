import type { NullableId } from '@feathersjs/feathers';
import type { Ref } from 'vue-demi';
import type { RequestTypeById } from './types.js';
export declare function useServicePending(): {
    isPending: Ref<{
        find: number;
        count: number;
        get: number;
        create: number;
        update: number;
        patch: number;
        remove: number;
    }>;
    createPendingById: Ref<Record<string | number | symbol, true>>;
    updatePendingById: Ref<Record<string | number | symbol, true>>;
    patchPendingById: Ref<Record<string | number | symbol, true>>;
    removePendingById: Ref<Record<string | number | symbol, true>>;
    isFindPending: import("vue-demi").ComputedRef<boolean>;
    isCountPending: import("vue-demi").ComputedRef<boolean>;
    isGetPending: import("vue-demi").ComputedRef<boolean>;
    isCreatePending: import("vue-demi").ComputedRef<boolean>;
    isUpdatePending: import("vue-demi").ComputedRef<boolean>;
    isPatchPending: import("vue-demi").ComputedRef<boolean>;
    isRemovePending: import("vue-demi").ComputedRef<boolean>;
    setPending: (method: 'find' | 'count' | 'get' | 'create' | 'update' | 'patch' | 'remove', value: boolean) => void;
    setPendingById: (id: NullableId, method: RequestTypeById, val: boolean) => void;
    unsetPendingById: (...ids: NullableId[]) => void;
    clearAllPending: () => void;
};
