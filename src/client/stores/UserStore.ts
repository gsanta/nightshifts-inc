import { User } from './User';
import { EventEmitter } from 'events';
import { ErrorMessage } from '../gui/ErrorMessage';

export class UserStore extends EventEmitter {
    private userModel: User;
    public errors: ErrorMessage[] = [];

    constructor() {
        super();
        this.userModel = User.NULL_USER_MODEL;
    }

    public setErrors(errors: ErrorMessage[]) {
        this.errors = errors;
        this.emitChange();
    }

    public getErrors(): ErrorMessage[] {
        return this.errors;
    }

    public setModel(userModel: User) {
        this.userModel = userModel;
        this.emitChange();
    }

    public getModel() {
        return this.userModel;
    }

    public onChange(eventHandler: () => void) {
        this.on('change', eventHandler);
    }

    public offChange(eventHandler: () => void) {
        this.removeListener('change', eventHandler);
    }

    private emitChange() {
        this.emit('change');
    }
}
