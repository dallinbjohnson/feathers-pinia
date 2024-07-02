import { PiniaService } from '../create-pinia-service.js';
import { AnyData } from '../types.js';
import { FeathersService, Params } from '@feathersjs/feathers';

export type Service = FeathersService | PiniaService<FeathersService>;
export interface useServiceInstanceOptions<S extends Service> {
    service: S;
    store: any;
}
export declare function useServiceInstance<M extends AnyData, S extends Service, P extends Params = Params>(data: M, options: useServiceInstanceOptions<S>): M;
