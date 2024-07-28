import { RouteHandler } from '../api';
import { DatabaseError } from '../api-errors';
import { Client } from '../models/client';

export const getOneClientHandler: RouteHandler = async (req) => {
    const id = String(req.query.clientId);

    const user = await Client.findById(id);

    if (!user) {
        throw new DatabaseError(`Could not retrieve client with id: ${id}`);
    }

    return user.toObject();
};
