import { Dispatcher } from 'flux';
import { ActionHandler, SendActionFunc } from './ActionHandler';
import { World } from '../model/World';


export class ActionDispatcher {
    private handlers: Set<ActionHandler>;
    private world: World;

    constructor(world: World) {
        this.handlers = new Set();
        this.world = world;
    }

    public registerActionHandler(handler: ActionHandler) {
        this.handlers.add(handler);
    }

    public unregisterActionHandler(handler: ActionHandler) {
        this.handlers.delete(handler);
    }

    public dispatch(type: string, ...payload: any[]) {
        this.handlers.forEach(handler => handler.sendAction(type, this.world, ...payload));
    }
}
