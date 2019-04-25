import { Room } from './Room';

export abstract class RoomState {
    public abstract activate(room: Room);
    public abstract canRoomTransitionToThis(room: Room): boolean;
    public abstract makeInactive(room: Room): RoomState;
    public abstract canGoInactive(): boolean;
    public abstract makeReserved(room: Room): RoomState;
    public abstract canGoReserved(): boolean;
    public abstract makeActive(room: Room): RoomState;

    public abstract canGoActive(): boolean;
}
