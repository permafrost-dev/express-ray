import { HttpMethod } from '@/lib/HttpMethod';
import micromatch from 'micromatch';
import { ray } from 'node-ray';
export interface SendRequestToRayOptions {
    methods?: HttpMethod[];
    paths?: {
        include?: string[];
        ignore?: string[];
    };
}

export const sendRequestToRay = (options: SendRequestToRayOptions = {}) => {
    const matchMethods = options.methods || [HttpMethod.ANY];
    const matchPaths = options.paths?.include || ['*'];
    const ignorePaths = options.paths?.ignore || [];

    const result = (req, res, next, rayInstance: any = null) => {
        const matchedPath = micromatch.isMatch(req.path, matchPaths);
        const isIgnoredPath = micromatch.isMatch(req.path, ignorePaths);
        const matchedMethod = micromatch.isMatch(req.method.toUpperCase(), matchMethods);

        if (!matchedMethod) {
            return next();
        }

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
