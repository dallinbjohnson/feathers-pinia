import { HookContext, NextFunction } from '@feathersjs/feathers';

export declare function eventLocks(): (context: HookContext, next: NextFunction) => Promise<void>;
