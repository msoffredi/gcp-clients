import { ResponseBody, RouteHandler } from '@msoffredi/gcp-common';
import { Client, ClientRecord } from '../models/client';
import { Request } from '@google-cloud/functions-framework';

export const getClientsHandler: RouteHandler<
    Request,
    ResponseBody<ClientRecord>
> = async (req) => {
    let query = Client.find().sort('-createdAt');

    if (req.query.lastCreatedAt) {
        query = query.where('createdAt').lt(Number(req.query.lastCreatedAt));
    }

    const findResult = await query.limit(Number(req.query.limit || 20)).exec();

    return {
        count: findResult.length,
        data: findResult,
    };
};
