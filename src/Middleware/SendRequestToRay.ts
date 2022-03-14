import { ray } from 'node-ray';
import micromatch from 'micromatch';
export interface SendRequestToRayOptions {
    paths?: {
        include?: string[];
        ignore?: string[];
    };
}

export const sendRequestToRay = (options: SendRequestToRayOptions = {}) => {
    const matchPaths = options.paths?.include || ['*'];
    const ignorePaths = options.paths?.ignore || [];

    const result = (req, res, next, rayInstance: any = null) => {
        const matchedPath = micromatch.isMatch(req.path, matchPaths);
        const isIgnoredPath = micromatch.isMatch(req.path, ignorePaths);

        if (!matchedPath || isIgnoredPath) {
            return next();
        }

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

    return result;
};

export default sendRequestToRay;
