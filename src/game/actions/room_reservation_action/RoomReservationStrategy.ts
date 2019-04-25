import { Room } from '../../world_items/room/Room';


export interface RoomReservationStrategy {
    chooseRoom(rooms: Room[]): Room;
}
