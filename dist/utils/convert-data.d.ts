import { ServiceInstance } from '../modeling/index.js';
import { AnyData, AnyDataOrArray } from '../types.js';
import { PiniaService } from '../create-pinia-service.js';
import { FeathersService } from '@feathersjs/feathers';

export declare function convertData(service: PiniaService<FeathersService>, result: AnyDataOrArray<AnyData>): AnyData | ServiceInstance<AnyData>[];
