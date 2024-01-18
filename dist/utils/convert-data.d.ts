import type { FeathersService } from '@feathersjs/feathers';
import type { PiniaService } from '../create-pinia-service.js';
import type { AnyData, AnyDataOrArray } from '../types.js';
import type { ServiceInstance } from '../modeling/index.js';
export declare function convertData(service: PiniaService<FeathersService>, result: AnyDataOrArray<AnyData>): AnyData | ServiceInstance<AnyData>[];
