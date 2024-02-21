/**
 * Push data to the store and return the new data.
 */
export declare function pushToStore<Data>(data: Data, service: {
    createInStore: any;
}): any;
/**
 * Define a virtual property on an object.
 */
export declare function defineVirtualProperty<Data>(data: Data, key: string, getter: any): void;
export declare function defineVirtualProperties<Data>(data: Data, getters: Record<string, any>): void;
