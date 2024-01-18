import type { HookContext, NextFunction } from '@feathersjs/feathers';
/**
 * Assures that the client reuses SSR-provided data instead of re-making the same query.
 *
 * Checks the `store.pagination` object to see if a query's results came from SSR-provided data.
 * If the data was from SSR, the SSR'd data is used and then set to `fromSSR = false` to allow
 * normal queries to happen again.
 */
export declare function handleFindSsr(): (context: HookContext, next: NextFunction) => Promise<void>;
