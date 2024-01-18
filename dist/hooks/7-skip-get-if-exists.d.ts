import type { HookContext, NextFunction } from '@feathersjs/feathers';
export declare function skipGetIfExists(): (context: HookContext, next: NextFunction) => Promise<void>;
