import { HookContext, NextFunction } from '@feathersjs/feathers';

/**
 * Normalizes two things
 *  - pagination across all adapters, including @feathersjs/memory
 *  - the find response so that it always holds data at `response.data`
 * @returns { data: AnyData[] }
 */
export declare function normalizeFind(): (context: HookContext, next?: NextFunction) => Promise<void>;
