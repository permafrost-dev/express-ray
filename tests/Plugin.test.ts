import { installPlugin } from '@/Plugin';

it('installs the plugin', () => {
    const app = {};
    const rayInstance = Math.random();

    installPlugin(app, rayInstance);

    expect(app).toHaveProperty('$ray', rayInstance);
});
