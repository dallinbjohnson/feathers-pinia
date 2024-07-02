import { AnyData } from '../types.js';

/**
 * Defines all provided properties as non-enumerable, configurable, values
 */
export declare function defineValues<M extends AnyData, D extends AnyData>(data: M, properties: D): M;
/**
 * Defines all provided properties as non-enumerable, configurable, getters
 */
export declare function defineGetters<M extends AnyData, D extends AnyData>(data: M, properties: D): M;
/**
 * Defines all provided properties as non-enumerable, configurable, setters
 */
export declare function defineSetters<M extends AnyData, D extends AnyData>(data: M, properties: D): M;
