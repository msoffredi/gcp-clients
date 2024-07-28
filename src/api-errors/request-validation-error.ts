import { CustomError } from './custom-error';
import { ErrorEntry } from './types';

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ErrorEntry[]) {
        super('Invalid request parameters');

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors;
    }
}
