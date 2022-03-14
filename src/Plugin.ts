import { ray } from 'node-ray';

export function installPlugin(app: any) {
    app['$ray'] = ray;
}
