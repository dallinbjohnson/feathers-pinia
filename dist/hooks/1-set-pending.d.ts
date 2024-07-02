import { HookContext, NextFunction } from '@feathersjs/feathers';

/**
 * Controls pending state
 */
export declare function setPending(): (context: HookContext, next: NextFunction) => Promise<void>;
