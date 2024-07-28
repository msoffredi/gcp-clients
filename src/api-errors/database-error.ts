import { CustomError } from './custom-error';
import { ErrorEntry } from './types';

export class DatabaseError extends CustomError {
    statusCode = 422;

    constructor(public override message: string) {
        super(message);

        Object.setPrototypeOf(this, DatabaseError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message } as ErrorEntry];
    }
}
