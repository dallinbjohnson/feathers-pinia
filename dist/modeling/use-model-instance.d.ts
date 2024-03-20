import type { Ref } from 'vue-demi';
import type { CloneOptions } from '../stores/index.js';
import type { AnyData, ById, Params } from '../types.js';
import type { BaseModelData, ModelInstanceData } from './types.js';
interface UseModelInstanceOptions<M, Q extends AnyData> {
    idField: string;
    clonesById: Ref<ById<AnyData>>;
    clone: (item: M, data?: Record<string, any>, options?: CloneOptions) => M;
    commit: (item: M, data?: Partial<M>) => M;
    reset: (item: M, data?: Record<string, any>) => M;
    createInStore: (data: M | M[]) => M | M[];
    removeFromStore: (data: M | M[] | null, params?: Params<Q>) => M | M[] | null;
}
export declare function useModelInstance<M extends AnyData, Q extends AnyData>(data: ModelInstanceData<M>, options: UseModelInstanceOptions<M, Q>): Partial<M & BaseModelData>;
export {};
