/* eslint-disable @typescript-eslint/no-empty-function */

import { sendErrorToRay } from '@/Middleware/SendErrorToRay';
import { FakeRay } from '@tests/TestClasses/FakeRay';

it('sends an error to ray', () => {
    const rayInstance = new FakeRay();

    const request = {
        method: 'GET',
        url: '/',
        params: {},
        query: {},
    };

    sendErrorToRay(new Error('test'), request, {}, () => {}, rayInstance);

    expect(rayInstance.sentPayloads).toHaveLength(1);
    expect(rayInstance.sentPayloads).toMatchSnapshot();
});
