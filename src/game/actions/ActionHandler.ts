import { World } from '../model/World';


export interface SendActionFunc<T> {
    (type: string, payload: T, world: World): void;
}

export interface ActionHandler {
    sendAction(type: string, world: World, ...payload: any[]);
}
