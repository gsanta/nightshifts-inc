import { RoomReservationStrategy } from './RoomReservationStrategy';
import { WorldItem } from '../../../world/world_items/item_types/WorldItem';


export class RandomRoomReservationStrategy implements RoomReservationStrategy {
    public chooseRoom(rooms: WorldItem[]): WorldItem {
        const randomRoomIndex = Math.floor(Math.random() * rooms.length);

        return rooms[randomRoomIndex];
    }
}
