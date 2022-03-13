import SendErrorToRay from '@/Middleware/SendErrorToRay';
import SendRequestToRay from '@/Middleware/SendRequestToRay';

export const middleware = {
    SendErrorToRay,
    SendRequestToRay,
};

export default {
    middleware,
};
