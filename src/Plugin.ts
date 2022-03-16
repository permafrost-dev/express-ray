import { ray } from 'node-ray';

export function installPlugin(app: any, rayFunction: CallableFunction | null = null) {
    app['$ray'] = rayFunction ?? ray;
}
