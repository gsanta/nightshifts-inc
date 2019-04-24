import { Room } from '../../../engine/world_items/Room';
import { World } from '../../model/World';
import { Door } from '../../model/world_items/Door';
import { RoomReservationStrategy } from './RoomReservationStrategy';

export class RoomReservationBookKeeper {
    private reservedRoom: Room;
    private roomReservationStrategy: RoomReservationStrategy;
    private world: World;

    constructor(roomReservationStrategy: RoomReservationStrategy, world: World) {
        this.roomReservationStrategy = roomReservationStrategy;
        this.world = world;
    }

    public nextDayPassed() {
        if (this.reservedRoom) {
            this.makeRoomFree(this.reservedRoom);
        }

        this.makeRoomReserved(this.roomReservationStrategy.chooseRoom(this.world.rooms));
    }

    private makeRoomFree(room: Room) {
        room.borderItems
        .filter(item => item instanceof Door)
        .forEach((door: Door) => {
            door.setMaterial(this.world.materials.door);
        });
    }

    private makeRoomReserved(room: Room) {
        room.borderItems
        .filter(item => item instanceof Door)
        .forEach((door: Door) => {
            door.setMaterial(this.world.materials.doorClosed);
        });
    }
}
