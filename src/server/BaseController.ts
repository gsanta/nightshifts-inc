import * as express from 'express';
import { FieldError } from './model/FieldError';

const send400 = (message: string, res: express.Response) => res.status(400).json(new FieldError(message).toJson());

const send400Error = (error: {toJson(): void}, res: express.Response) => res.status(400).json(error.toJson());


export class BaseController {

    protected async addErrorHandling(action: () => Promise<void>, res: express.Response) {
        try {
            await action();
        } catch (e) {
            if (e instanceof FieldError) {
                return send400Error(e, res);
            } else {
                return send400(e.message, res);
            }
        }
    }
}
