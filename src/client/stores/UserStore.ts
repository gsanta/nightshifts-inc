import { User } from './User';
import { EventEmitter } from 'events';
import { FieldError } from '../../server/routes/validators/FieldError';
import { ValidationError } from './ValidationError';

export class UserStore extends EventEmitter {
    private userModel: User;
    public errors: ValidationError[] = [];

    constructor() {
        super();
        this.userModel = User.NULL_USER_MODEL;
    }

    public setErrors(errors: ValidationError[]) {
        this.errors = errors;
        this.emitChange();
    }

    public getErrors(): ValidationError[] {
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
