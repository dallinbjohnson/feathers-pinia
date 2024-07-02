import { EventName } from './types.js';
import { MaybeArray } from '../types.js';
import { Id } from '@feathersjs/feathers';

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
