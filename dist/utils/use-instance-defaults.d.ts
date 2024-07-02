import { AnyData } from '../types.js';

export declare function useInstanceDefaults<D extends AnyData, M extends AnyData>(defaults: D, data: M): M & D;
