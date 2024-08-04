import {
    HttpFunction,
    Request,
    Response,
} from '@google-cloud/functions-framework';
import { validateEnvVars } from '../utils/validations';
import { createClientHandler } from '../route-handlers/create-client';
import { getClientsHandler } from '../route-handlers/get-clients';
import { getOneClientHandler } from '../route-handlers/get-one-client';
import { delClientHandler } from '../route-handlers/del-client';
import { startDb } from '../utils/db';
import {
    BadMethodError,
    BadRequestError,
    CustomError,
    healthcheckHandler,
    MongoDBHelper,
    RequestHelper,
    ResponseBody,
} from '@msoffredi/gcp-common';

export const handler: HttpFunction = async (req: Request, res: Response) => {
    console.log('Request received:', RequestHelper.logReq(req));

    if (req.method === 'OPTIONS') {
        res.status(204)
            .set({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,PUT,DELETE',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '3600',
            })
            .send();
        return;
    }

    validateEnvVars();
    await startDb();

    let status = 200;
    let body: ResponseBody<unknown> = {};

    // Resolving preflights early
    try {
        if (RequestHelper.getPath(req) === '/healthcheck') {
            if (req.method === 'GET') {
                body = await healthcheckHandler(req);
            } else {
                throw new BadMethodError();
            }
        } else if (RequestHelper.getPath(req) === '/clients') {
            if (req.method === 'POST') {
                body = await createClientHandler(req);
            } else if (req.method === 'GET') {
                body = await getClientsHandler(req);
            } else {
                throw new BadMethodError();
            }
        } else if (RequestHelper.getPath(req).startsWith('/clients/')) {
            switch (req.method) {
                case 'GET':
                    body = await getOneClientHandler(req);
                    break;
                case 'DELETE':
                    body = await delClientHandler(req);
                    break;
                default:
                    throw new BadMethodError();
            }
        } else {
            throw new BadRequestError();
        }
    } catch (err) {
        console.error(err);

        if (err instanceof CustomError) {
            status = err.statusCode;
            body = {
                errors: err.serializeErrors(),
            };
        } else {
            throw err;
        }
    }

    // Leaving connection closed when possible
    await MongoDBHelper.stopDb();

    // res.status(status).set(headers).send(JSON.stringify(body));
    res.status(status)
        .set({ 'Access-Control-Allow-Origin': '*' })
        .send(JSON.stringify(body));
};
