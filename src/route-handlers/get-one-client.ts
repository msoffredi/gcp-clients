import { DatabaseError, RouteHandler } from '@msoffredi/gcp-common';
import { Client } from '../models/client';

export const getOneClientHandler: RouteHandler = async (req) => {
    const id = String(req.query.clientId);

    const client = await Client.findById(id);

    if (!client) {
        throw new DatabaseError(`Could not retrieve client with id: ${id}`);
    }

    return client.toObject();
};
