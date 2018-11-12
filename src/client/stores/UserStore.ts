import { UserModel } from './UserModel';
import { EventEmitter } from 'events';

export class UserStore extends EventEmitter {
    private userModel: UserModel;

    public setModel(userModel: UserModel) {
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
