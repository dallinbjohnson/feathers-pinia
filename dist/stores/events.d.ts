import type { FeathersService } from '@feathersjs/feathers';
import type { AnyData } from '../types.js';
import type { PiniaService } from '../create-pinia-service.js';
import type { HandleEvents } from './types.js';
interface UseServiceStoreEventsOptions<M extends AnyData> {
    service: PiniaService<FeathersService<any, any>>;
    debounceEventsTime?: number;
    debounceEventsGuarantee?: boolean;
    handleEvents?: HandleEvents<M>;
}
export declare function useServiceEvents<M extends AnyData>(options: UseServiceStoreEventsOptions<M>): void;
export {};
