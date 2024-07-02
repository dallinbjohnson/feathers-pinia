import { PiniaService } from './create-pinia-service.js';
import { AnyData, CustomFilter } from './types.js';
import { HandleEvents, useServiceStore } from './stores/index.js';
import { Application, FeathersService } from '@feathersjs/feathers';

export interface SetupInstanceUtils {
    app?: any;
    service?: any;
    servicePath?: string;
}
export interface PiniaServiceConfig {
    /**
     * The name of the store to use for this service. Defaults to `service:${servicePath}`.
     * You can also use storeName to make two services share the same store.
     */
    storeName?: string;
    /**
     * Overrides the service used for instance-level service methods, like patch, and remove.
     * Useful for "proxy" services. For example: `pages/full` loads the page record with populated
     * data, but you want to patch/remove the record through the `pages` service.
     */
    instanceServicePath?: string;
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
    /**
     * Custom filters are applied before the sift operators. They are useful for custom
     * filters that are not supported by sift, like `$fuzzy`.
     */
    customFilters?: CustomFilter[];
}
export interface CreatePiniaClientConfig extends PiniaServiceConfig {
    idField: string;
    pinia: any;
    ssr?: boolean;
    storage?: Storage;
    services?: Record<string, PiniaServiceConfig>;
}
export type AppWithServices = {
    services: {
        [key: string]: FeathersService;
    };
};
export type CreatePiniaServiceTypes<T extends AppWithServices> = {
    [Key in keyof T['services']]: PiniaService<T['services'][Key]> & T['services'][Key];
};
export interface AppExtensions {
    storeAssociated: (data: any, config: Record<string, string>) => void;
    clearStorage: () => void;
    pushToStore: <Data>(data: Data, servicePath: string) => void;
    defineVirtualProperty: <Data>(data: Data, key: string, getter: any) => void;
    defineVirtualProperties: <Data>(data: Data, getters: Record<string, any>) => void;
}
/**
 * ```ts
 * import { FeathersPiniaClient } from 'feathers-pinia'
 * import { Application, Service } from '@feathersjs/feathers'
 * interface Book {
 *   id: string
 *   title: string
 * }
 * interface ServiceTypes {
 *   books: Service<Book>
 * }
 * export type MyFeathersPiniaApp = FeathersPiniaClient<Application<ServiceTypes>>
 * ```
 */
export type FeathersPiniaClient<App extends Application> = Application<CreatePiniaServiceTypes<App>> & AppExtensions;
export declare function createPiniaClient<App extends Application>(client: App, options: CreatePiniaClientConfig): Application<CreatePiniaServiceTypes<App>> & AppExtensions;
