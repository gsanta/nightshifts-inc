
export class JsonPropertyError extends Error {
    public property: string;

    constructor (message: string, property: string) {
        super(message);

        this.property = property;
        // set the prototype explicitly, TS 2.1 breaking change
        (<any>this).__proto__ = JsonPropertyError.prototype;
    }
}
