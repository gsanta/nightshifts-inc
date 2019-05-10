import { RoomReservationStrategy } from './RoomReservationStrategy';
import { Room } from '../../../world/world_items/item_types/room/Room';


export class RandomRoomReservationStrategy implements RoomReservationStrategy {
    public chooseRoom(rooms: Room[]): Room {
        const randomRoomIndex = Math.floor(Math.random() * rooms.length);

        return <Room> rooms[randomRoomIndex];
    }
}
