import { World } from '../world/World';


export interface SendActionFunc<T> {
    (type: string, payload: T, world: World): void;
}

export interface ActionHandler {
    handle(type: string, world: World, ...payload: any[]);
}
