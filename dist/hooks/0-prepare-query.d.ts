import { HookContext, NextFunction } from '@feathersjs/feathers';

/**
 * deeply unrefs `params.query`
 */
export declare function unrefQuery(): (context: HookContext, next: NextFunction) => Promise<void>;
