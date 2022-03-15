import { ExpressRay } from '@/ExpressRay';

export class FakeExpressRay extends ExpressRay {
    public sentPayloads: any[] = [];

    send(...args: any[]) {
        this.sentPayloads.push(...args);

        return this;
    }

    sendRequest(payloads: any, meta?: any[]) {
        this.sentPayloads.push({ payloads, meta });

        return this;
    }
}
