import { Request } from '@google-cloud/functions-framework';

export class RequestHelper {
    public static getPath = (req: Request): string => {
        const xEnvoyOriginalPath = req.headers['x-envoy-original-path'];

        if (typeof xEnvoyOriginalPath === 'string') {
            const pathElements = xEnvoyOriginalPath.split('?');
            return String(pathElements[0]);
        }

        return '';
    };
}
