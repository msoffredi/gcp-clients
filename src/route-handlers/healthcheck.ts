import { ResponseBody, RouteHandler } from '../api';

export const healthcheckHandler: RouteHandler =
    async (): Promise<ResponseBody> => {
        return {
            serviceStatus: 'healthy',
        };
    };
