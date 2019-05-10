import { Room } from '../../../world/world_items/item_types/Room';


export interface RoomReservationStrategy {
    chooseRoom(rooms: Room[]): Room;
}
