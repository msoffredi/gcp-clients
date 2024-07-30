import { TestHelper } from '@msoffredi/gcp-common';
import { handler } from '../../src/handlers/clients-api';

// This includes all tests for auth.handler()
it('should return a 200 and a valid status as healthy on GET over healthcheck endpoint', async () => {
    const req = TestHelper.constructAPIGwReq({
        method: 'GET',
        path: '/healthcheck',
    });

    const res = TestHelper.getResponse();
    await handler(req, res);

    expect(res.statusMessage).toEqual(
        JSON.stringify({ serviceStatus: 'healthy' })
    );
});
