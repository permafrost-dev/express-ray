export class FakeRay {
    public sentPayloads: any[] = [];

    public table(data: Record<string, any>, label: string | null = null) {
        this.sentPayloads.push({ data, label });

        return this;
    }
}
