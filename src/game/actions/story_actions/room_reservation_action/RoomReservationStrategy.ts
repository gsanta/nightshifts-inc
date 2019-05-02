import { Room } from '../../../world/world_items/room/Room';


export interface RoomReservationStrategy {
    chooseRoom(rooms: Room[]): Room;
}
