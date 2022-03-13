import { ray } from 'node-ray';

export const sendErrorToRay = (err, req, res, next) => {
    const { method, url, params, query } = req;

    ray().table(
        {
            error: err.message,
            method,
            url,
            params,
            query,
        },
        'Error',
    );

    if (res.headersSent) {
        return next(err);
    }

    next(err);
};

export default sendErrorToRay;
