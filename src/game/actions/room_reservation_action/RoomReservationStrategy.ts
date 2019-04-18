import { Room } from '../../../engine/world_items/Room';


export interface RoomReservationStrategy {
    chooseRoom(rooms: Room[]): Room;
}
