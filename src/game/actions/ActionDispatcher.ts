import { ActionHandler } from './ActionHandler';
import { World } from '../world/World';


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
        this.handlers.forEach(handler => handler.handle(type, this.world, ...payload));
    }
}
