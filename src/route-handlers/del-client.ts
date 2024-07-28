import { RouteHandler } from '../api';
import { DatabaseError } from '../api-errors';
import { Client } from '../models/client';

export const delClientHandler: RouteHandler = async (req) => {
    const id = String(req.query.clientId);

    try {
        const deleteResult = await Client.deleteOne({ _id: id });

        if (deleteResult.deletedCount === 0) {
            throw new DatabaseError(`Could not delete client with id ${id}`);
        }
    } catch (err) {
        throw new DatabaseError(`Could not delete client with id ${id}`);
    }

    return {};
};
