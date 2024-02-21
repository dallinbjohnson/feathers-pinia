import type { ComputedRef, Ref } from 'vue';
import type { AnyData } from '../types';
type AnyRef<D> = Ref<D> | ComputedRef<D>;
interface UseBackupOptions<D> {
    onlyProps?: keyof D;
    idField?: keyof D;
}
/**
 * Provides a backup of the current instance, and methods to save and restore it.
 * The `save` method will diff the current instance with the backup. Any values in the new
 * instance that are different in the old instance will be passed to the save method as data.
 */
export declare function useBackup<D extends AnyData>(data: AnyRef<D>, options?: UseBackupOptions<D>): {
    data: AnyRef<D>;
    backup: Ref<any>;
    save: () => Promise<any>;
    restore: (currentInstance: any) => any;
};
export {};
