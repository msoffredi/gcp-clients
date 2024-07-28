import { CustomError } from './custom-error';
import { ErrorEntry } from './types';

export class UnexpectedError extends CustomError {
    statusCode = 400;

    constructor(public override message: string) {
        super(message);

        Object.setPrototypeOf(this, UnexpectedError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message } as ErrorEntry];
    }
}
