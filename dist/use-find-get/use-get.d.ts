import type { Id } from '@feathersjs/feathers';
import type { MaybeRef } from '@vueuse/core';
import type { AnyData, MaybeRefOrComputed } from '../types.js';
import type { UseFindGetDeps, UseGetParams } from './types.js';
export declare function useGet<M = AnyData>(_id: MaybeRefOrComputed<Id | null>, _params: MaybeRef<UseGetParams> | undefined, deps: UseFindGetDeps): {
    params: UseGetParams;
    isSsr: boolean;
    data: M | null;
    ids: Id[];
    getFromStore: any;
    get: () => Promise<AnyData>;
    request: {
        then: <TResult1 = AnyData, TResult2 = never>(onfulfilled?: ((value: AnyData) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined) => Promise<TResult1 | TResult2>;
        catch: <TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined) => Promise<AnyData | TResult>;
        finally: (onfinally?: (() => void) | null | undefined) => Promise<AnyData>;
        readonly [Symbol.toStringTag]: string;
    } | null;
    requestCount: number;
    queryWhen: (_queryWhenFn: () => boolean) => void;
    isPending: boolean;
    hasBeenRequested: boolean;
    hasLoaded: boolean;
    error: any;
    clearError: () => null;
};
