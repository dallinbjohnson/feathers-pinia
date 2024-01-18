import type { Id } from '@feathersjs/feathers';
import type { MaybeArray } from '../types.js';
import type { EventName } from './types.js';
export declare function useServiceEventLocks(): {
    eventLocks: {
        created: {
            [key: string]: boolean;
        };
        patched: {
            [key: string]: boolean;
        };
        removed: {
            [key: string]: boolean;
        };
        updated: {
            [key: string]: boolean;
        };
    };
    toggleEventLock: (data: MaybeArray<Id>, event: EventName) => void;
    clearEventLock: (data: MaybeArray<Id>, event: EventName) => void;
};
