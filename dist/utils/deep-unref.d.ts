import { MaybeRef } from '@vueuse/core';

/**
 * Deeply unref a value, recursing into objects and arrays.
 *
 * Adapted from https://github.com/DanHulton/vue-deepunref
 */
export declare function deepUnref(val: MaybeRef<Record<string, any>>): any;
