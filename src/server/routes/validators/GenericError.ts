
export class GenericError extends Error {
    public statusCode: number;

    constructor (message: string, statusCode = 400) {
        super(message);

        this.statusCode = statusCode;
        // set the prototype explicitly, TS 2.1 breaking change
        (<any>this).__proto__ = GenericError.prototype;
    }
}