import { Ray } from 'node-ray';

export class ExpressRay extends Ray {
    public request(request: any) {
        const data = {
            method: request.method,
            url: request.url,
            params: request.params,
            query: request.query,
            headers: request.headers,
        };

        this.table(data, 'Request');
    }
}

export function ray(...args: any[]) {
    return ExpressRay.create().send(...args);
}
