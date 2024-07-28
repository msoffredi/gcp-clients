import { CustomError } from './custom-error';
import { ErrorEntry } from './types';

export class BadRequestError extends CustomError {
    statusCode = 404;

    constructor() {
        super('Bad Request. The endpoint is invalid.');

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message } as ErrorEntry];
    }
}
