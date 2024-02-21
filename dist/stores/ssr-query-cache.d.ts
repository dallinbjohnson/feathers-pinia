import type { AnyData } from '../types';
export declare function useSsrQueryCache(): {
    resultsByQid: Record<string, AnyData>;
    getQid: (qid: string) => AnyData;
    setQid: (qid: string, data: any) => void;
    clearQid: (qid: string) => void;
    clearAllQids: () => void;
};
