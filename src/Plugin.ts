import { ray } from 'node-ray';

export function installPlugin(app: any, rayInstance: any = null) {
    app['$ray'] = rayInstance ?? ray;
}
