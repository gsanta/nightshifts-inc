
export class JsonPropertyError extends Error {
    public property: string;
    public statusCode: number;

    constructor (message: string, property: string, statusCode = 400) {
        super(message);

        this.property = property;
        this.statusCode = statusCode;
        // set the prototype explicitly, TS 2.1 breaking change
        (<any>this).__proto__ = JsonPropertyError.prototype;
    }
}
