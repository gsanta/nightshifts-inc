
export class FieldError extends Error {
    public properties: string[];
    public statusCode: number;

    constructor (message: string, properties: string[], statusCode = 400) {
        super(message);

        this.properties = properties;
        this.statusCode = statusCode;
        // set the prototype explicitly, TS 2.1 breaking change
        (<any>this).__proto__ = FieldError.prototype;
    }
}
