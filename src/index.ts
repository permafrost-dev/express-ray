import SendErrorToRay from '@/Middleware/SendErrorToRay';
import SendRequestToRay from '@/Middleware/SendRequestToRay';
import { installPlugin } from './Plugin';

export const middleware = {
    SendErrorToRay,
    SendRequestToRay,
};

export const plugin = {
    install: (app: any) => installPlugin(app),
};

export default {
    middleware,
    plugin,
};
