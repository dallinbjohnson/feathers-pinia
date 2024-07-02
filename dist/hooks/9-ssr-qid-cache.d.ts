import { HookContext, NextFunction } from '@feathersjs/feathers';

/**
 * Prevents duplicate requests by cacheing results from qid-enabled queries.
 * Clears the cache on the client after 500ms.
 */
export declare function handleQidCache(): (context: HookContext, next: NextFunction) => Promise<any>;
