import { Request, Response } from '@google-cloud/functions-framework';

interface ConstructAPIGwReqOptions {
    path?: string | undefined;
    method?: string | undefined;
    [key: string]: string | undefined;
}

interface TestHeaders {
    [key: string]: string;
}

class TestResponse {
    constructor(
        public statusCode = 200,
        public statusMessage = '',
        public headers: TestHeaders = {}
    ) {}

    public status(statusCode: number): TestResponse {
        this.statusCode = statusCode;
        return this;
    }

    public send(data: string): TestResponse {
        this.statusMessage = data;
        return this;
    }

    public set(headers: TestHeaders): TestResponse {
        this.headers = headers;
        return this;
    }
}

export class TestHelper {
    public static testUserEmail = 'test@test.com';
    public static testUserId = 'user123';

    public static constructAPIGwReq = (
        options: ConstructAPIGwReqOptions
    ): Request => {
        return {
            headers: {
                'x-envoy-original-path': options.path || '/',
            },
            method: (options.method || 'GET').toUpperCase(),
        } as unknown as Request;
    };

    public static getResponse = (): Response => {
        return new TestResponse() as unknown as Response;
    };
}
