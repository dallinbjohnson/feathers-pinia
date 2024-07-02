import { Params } from '@feathersjs/feathers';
import { FetchClient } from '@feathersjs/rest-client';

export declare class OFetch extends FetchClient {
    request(options: any, params: Params): Promise<any>;
}
