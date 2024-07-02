import { skipGetIfExists } from './7-skip-get-if-exists.js';
import { normalizeFind } from './6-normalize-find.js';
import { makeModelInstances } from './4-model-instances.js';
import { syncStore } from './3-sync-store.js';
import { eventLocks } from './2-event-locks.js';
import { setPending } from './1-set-pending.js';

export { syncStore, setPending, eventLocks, normalizeFind, skipGetIfExists, makeModelInstances };
export declare function feathersPiniaHooks(): ((context: import('@feathersjs/feathers').HookContext<import('@feathersjs/feathers').Application<any, any>, any>, next: import('@feathersjs/feathers').NextFunction) => Promise<any>)[];
