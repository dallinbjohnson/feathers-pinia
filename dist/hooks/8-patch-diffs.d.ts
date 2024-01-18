import type { HookContext, NextFunction } from '@feathersjs/feathers';
export declare function patchDiffing(): (context: HookContext, next: NextFunction) => Promise<void>;
