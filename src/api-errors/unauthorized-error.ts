import { CustomError } from './custom-error';
import { ErrorEntry } from './types';

export class UnauthorizedError extends CustomError {
    statusCode = 401;

    constructor() {
        super('Unauthorized');

        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message } as ErrorEntry];
    }
}
