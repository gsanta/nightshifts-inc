import { Room } from '../Room';


export abstract class RoomState {
    protected context: Room;

    public setContext(room: Room) {
        this.context = room;
        room.state = this;
    }

    public abstract activate();
    public abstract canRoomTransitionToThis(room: Room): boolean;
}
