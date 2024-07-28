import { CustomError } from './custom-error';
import { ErrorEntry } from './types';

export class BadMethodError extends CustomError {
    statusCode = 405;

    constructor() {
        super('The http method used is not supported on this endpoint');

        Object.setPrototypeOf(this, BadMethodError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message } as ErrorEntry];
    }
}
