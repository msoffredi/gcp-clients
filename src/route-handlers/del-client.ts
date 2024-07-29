import { RouteHandler } from '../api';
import { DatabaseError } from '../api-errors';
import { EventTypes } from '../events';
import { clientPublisher } from '../events/client-publisher';
import { Client } from '../models/client';

export const delClientHandler: RouteHandler = async (req) => {
    const id = String(req.query.clientId);
    const client = await Client.findById(id);

    try {
        const deleteResult = await Client.deleteOne({ _id: id });

        if (!client || deleteResult.deletedCount === 0) {
            throw new DatabaseError(`Could not delete client with id ${id}`);
        }

        await clientPublisher({
            type: EventTypes.ClientDeleted,
            data: client?.toObject(),
        });
    } catch (err) {
        throw new DatabaseError(`Could not delete client with id ${id}`);
    }

    return {};
};
