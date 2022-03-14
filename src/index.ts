import SendErrorToRay from '@/Middleware/SendErrorToRay';
import SendRequestToRay from '@/Middleware/SendRequestToRay';
import { installPlugin } from './Plugin';

export const middleware = {
    SendErrorToRay,
    SendRequestToRay,
};

export const plugin = {
    install: installPlugin,
};

export default {
    middleware,
    plugin,
};
