import { User } from './User';
import { EventEmitter } from 'events';

export class UserStore extends EventEmitter {
    private userModel: User;

    constructor() {
        super();
        this.userModel = User.NULL_USER_MODEL;
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
