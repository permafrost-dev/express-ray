import { ray } from 'node-ray';

export const sendErrorToRay = (err, req, res, next) => {
    const { method, url, params, query } = req;

    ray().table({
        method,
        url,
        params,
        query,
    });

    if (res.headersSent) {
        return next(err);
    }

    res.status(500);

    res.send({ error: err });
};

export default sendErrorToRay;
