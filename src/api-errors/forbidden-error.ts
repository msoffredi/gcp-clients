import { CustomError } from './custom-error';
import { ErrorEntry } from './types';

export class ForbiddenError extends CustomError {
    statusCode = 403;

    constructor(public override message: string) {
        super(message);

        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message } as ErrorEntry];
    }
}
