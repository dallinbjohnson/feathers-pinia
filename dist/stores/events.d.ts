import { HandleEvents } from './types.js';
import { PiniaService } from '../create-pinia-service.js';
import { AnyData } from '../types.js';
import { FeathersService } from '@feathersjs/feathers';

interface UseServiceStoreEventsOptions<M extends AnyData> {
    service: PiniaService<FeathersService<any, any>>;
    debounceEventsTime?: number;
    debounceEventsGuarantee?: boolean;
    handleEvents?: HandleEvents<M>;
}
export declare function useServiceEvents<M extends AnyData>(options: UseServiceStoreEventsOptions<M>): void;
export {};
