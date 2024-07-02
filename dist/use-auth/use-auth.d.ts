import { NullableId } from '@feathersjs/feathers';
import { Ref } from 'vue-demi';

type SuccessHandler = (result: Record<string, any>) => Promise<Record<string, any> | void>;
type ErrorHandler = (error: Error) => Promise<void>;
interface UseAuthOptions {
    api: any;
    servicePath?: string;
    skipTokenCheck?: boolean;
    entityKey?: string;
    onSuccess?: SuccessHandler;
    onError?: ErrorHandler;
    onInitSuccess?: SuccessHandler;
    onInitError?: ErrorHandler;
    onLogoutSuccess?: SuccessHandler;
    onLogoutError?: ErrorHandler;
}
export interface AuthenticateData {
    strategy: 'jwt' | 'local';
    accessToken?: string;
    email?: string;
    password?: string;
}
export declare function useAuth<d = AuthenticateData, U = any>(options: UseAuthOptions): {
    userId: Ref<NullableId>;
    user: import('vue-demi').ComputedRef<U | null>;
    error: Ref<{
        name: string;
        message: string;
        stack?: string | undefined;
        cause?: unknown;
    } | null>;
    isPending: import('vue-demi').ComputedRef<boolean>;
    isLogoutPending: import('vue-demi').ComputedRef<boolean>;
    isInitDone: Ref<boolean>;
    isAuthenticated: Ref<boolean>;
    loginRedirect: Ref<string | Record<string, any> | null>;
    getPromise: () => Promise<Record<string, any>>;
    isTokenExpired: (jwt: string) => boolean;
    authenticate: (data?: d) => Promise<Record<string, any>>;
    reAuthenticate: () => Promise<Record<string, any>>;
    logout: () => Promise<any>;
    clearError: () => null;
};
export {};
