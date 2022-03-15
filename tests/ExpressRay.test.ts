import { FakeExpressRay } from '@tests/TestClasses/FakeExpressRay';

it('sends requests to Ray', () => {
    const rayInstance = FakeExpressRay.create();

    const request = {
        method: 'GET',
        url: '/',
        params: {},
        query: {},
        headers: {},
    };

    rayInstance.request(request);

    expect(rayInstance.sentPayloads).toHaveLength(1);
    expect(rayInstance.sentPayloads).toMatchSnapshot();
});
