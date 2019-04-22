import { Room } from '../Room';
import { ActiveRoomState } from './ActiveRoomState';
import { World } from '../../../game/model/World';
import { ReservedRoomState } from './ReservedRoomState';
import { InactiveRoomState } from './InactiveRoomState';

export abstract class RoomState {
    protected context: Room;

    public abstract activate(room: Room);
    public abstract canRoomTransitionToThis(room: Room): boolean;
    public abstract makeInactive(room: Room): RoomState;
    public abstract canGoInactive(): boolean;
    public abstract makeReserved(room: Room): RoomState;
    public abstract canGoReserved(): boolean;
    public abstract makeActive(room: Room): RoomState;

    public abstract canGoActive(): boolean;
}
