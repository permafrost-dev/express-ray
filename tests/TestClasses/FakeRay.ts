export class FakeRay {
    public sentPayloads: any[] = [];

    public request(request: any) {
        this.sentPayloads.push({ request });

        return this;
    }

    public table(data: Record<string, any>, label: string | null = null) {
        this.sentPayloads.push({ data, label });

        return this;
    }
}
