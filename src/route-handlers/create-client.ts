// import { randomUUID } from 'crypto';
import * as yup from 'yup';
import { Client, ClientRecord } from '../models/client';
import { RouteHandler } from '../api';
import { ErrorEntry, RequestValidationError } from '../api-errors';

const validationSchema = yup.object({
    name: yup.string().min(2).required(),
});

export const createClientHandler: RouteHandler = async (req) => {
    const errors: ErrorEntry[] = [];

    if (!req.body) {
        throw new RequestValidationError([
            {
                message:
                    'You need to provide a client name to add a new client',
            },
        ]);
    }

    let validatedBody: ClientRecord = { name: '' };

    try {
        validatedBody = await validationSchema.validate(req.body, {
            abortEarly: false,
        });

        // Validate name does not exist
        const existingClient = await Client.findOne({
            name: validatedBody.name,
        });

        if (existingClient) {
            errors.push({
                message: 'Client with same name already exists',
                field: 'name',
            });
        }
    } catch (err: unknown) {
        if (err instanceof yup.ValidationError) {
            err.inner.forEach((error) => {
                errors.push({
                    message: String(error.errors[0]),
                    field: String(error.path),
                });
            });
        } else {
            console.error(err);
            throw new RequestValidationError([
                {
                    message: 'Unexpected error validating parameters',
                },
            ]);
        }
    }

    if (errors.length) {
        throw new RequestValidationError(errors);
    }

    const client = Client.build({
        name: validatedBody.name,
    });
    await client.save();

    return client.toObject();
};
