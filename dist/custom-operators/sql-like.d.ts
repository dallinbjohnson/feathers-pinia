export declare function like(value: string, search: string, regexOptions?: string): boolean;
export declare function iLike(str: string, search: string): boolean;
export declare function $like(params: any, ownerQuery: any, options: any): import('sift').EqualsOperation<any>;
export declare function $notLike(params: any, ownerQuery: any, options: any): import('sift').EqualsOperation<any>;
export declare function $ilike(params: any, ownerQuery: any, options: any): import('sift').EqualsOperation<any>;
declare function $notILike(params: any, ownerQuery: any, options: any): import('sift').EqualsOperation<any>;
export declare const sqlOperations: {
    $like: typeof $like;
    $notLike: typeof $notLike;
    $notlike: typeof $notLike;
    $ilike: typeof $ilike;
    $iLike: typeof $ilike;
    $notILike: typeof $notILike;
};
export {};
