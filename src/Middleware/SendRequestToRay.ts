import { ray } from 'node-ray';

export const sendRequestToRay = (req, res, next, rayInstance: any = null) => {
    const { method, url, params, query, headers } = req;

    rayInstance = rayInstance ?? ray();

    const data = {
        method,
        url,
        params,
        query,
        headers,
    };

    if (method.toLowerCase() === 'post') {
        data['body'] = req.body;
    }

    rayInstance.table(data, 'Request');

    next();
};

export default sendRequestToRay;
