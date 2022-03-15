/* eslint-disable @typescript-eslint/no-empty-function */

import { sendRequestToRay } from '@/Middleware/SendRequestToRay';
import { FakeRay } from '@tests/TestClasses/FakeRay';

it('sends a get request to ray', () => {
    const rayInstance = new FakeRay();

    const request = {
        method: 'GET',
        url: '/',
        path: '/',
        params: {},
        query: {},
    };

    sendRequestToRay({})(request, {}, () => {}, rayInstance);

    expect(rayInstance.sentPayloads).toHaveLength(1);
    expect(rayInstance.sentPayloads).toMatchSnapshot();
});

it('sends a post request to ray', () => {
    const rayInstance = new FakeRay();

    const request = {
        method: 'POST',
        url: '/',
        path: '/',
        params: {},
        query: {},
        body: { message: 'test' },
    };

    sendRequestToRay({})(request, {}, () => {}, rayInstance);

    expect(rayInstance.sentPayloads).toHaveLength(1);
    expect(rayInstance.sentPayloads).toMatchSnapshot();
});
