import type { Application, FeathersService } from '@feathersjs/feathers';
import type { HandleEvents } from './stores/index.js';
import type { AnyData } from './types.js';
import { PiniaService } from './create-pinia-service.js';
import { useServiceStore } from './stores/index.js';
interface SetupInstanceUtils {
    app?: any;
    service?: any;
    servicePath?: string;
}
export interface PiniaServiceConfig {
    idField?: string;
    defaultLimit?: number;
    syncWithStorage?: boolean | string[];
    whitelist?: string[];
    paramsForServer?: string[];
    skipGetIfExists?: boolean;
    handleEvents?: HandleEvents<AnyData>;
    debounceEventsTime?: number;
    debounceEventsGuarantee?: boolean;
    setupInstance?: (data: any, utils: SetupInstanceUtils) => any;
    customizeStore?: (data: ReturnType<typeof useServiceStore>) => Record<string, any>;
    customSiftOperators?: Record<string, any>;
}
export interface CreatePiniaClientConfig extends PiniaServiceConfig {
    idField: string;
    pinia: any;
    ssr?: boolean;
    storage?: Storage;
    services?: Record<string, PiniaServiceConfig>;
}
export type CreatePiniaServiceTypes<T extends {
    [key: string]: FeathersService;
}> = {
    [Key in keyof T]: PiniaService<T[Key]> & T[Key];
};
export interface AppExtensions {
    storeAssociated: (data: any, config: Record<string, string>) => void;
    clearStorage: () => void;
}
export declare function createPiniaClient<Client extends Application>(client: Client, options: CreatePiniaClientConfig): Application<CreatePiniaServiceTypes<Client['services']>> & AppExtensions;
export {};
