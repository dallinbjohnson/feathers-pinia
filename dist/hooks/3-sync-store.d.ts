import { HookContext, NextFunction } from '@feathersjs/feathers';

export declare function syncStore(): (context: HookContext, next: NextFunction) => Promise<void>;
