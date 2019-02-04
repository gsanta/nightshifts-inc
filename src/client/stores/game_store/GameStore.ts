import { EventEmitter } from 'events';
import { World } from '../../../game/model/World';


export class GameStore extends EventEmitter {
    private world: World = null;

    public setModel(world: World) {
        this.world = world;
        this.emitChange();
    }

    public getModel() {
        return this.world;
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
