import { ObjectType } from '../types';
import { Request } from '@google-cloud/functions-framework';

export type RouteHandler<T = Request, S = ResponseBody> = (
    req: T
) => Promise<S>;

export interface PaginatedCollection<T = ObjectType> {
    count: number;
    data: T[];
}

export type ResponseBody<T = ObjectType> = T | PaginatedCollection<T>;
