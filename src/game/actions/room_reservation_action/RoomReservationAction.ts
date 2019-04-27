import { World } from '../../world/World';
import { GameActionType } from '../GameActionType';
import { Room } from '../../world/world_items/room/Room';
import { ActionHandler } from '../ActionHandler';
import { Door } from '../../world/world_items/door/Door';

export class RoomReservationAction implements ActionHandler {
    private reservedRooms: Room[] = [];

    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.DAY_PASSED:
                const room = this.getRandomRoom(world);

                this.reservedRooms.forEach(reservedRoom => reservedRoom.makeInactive());

                if (room.canGoReserved()) {
                    room.makeReserved();
                    this.reservedRooms = [room];
                }

                break;
            default:
                break;
        }
    }

    private getRandomRoom(world: World): Room {
        const rooms = world.worldItems.filter(gameObj => gameObj.name === 'room');

        const randomRoomIndex = Math.floor(Math.random() * rooms.length);

        return <Room> rooms[randomRoomIndex];
    }

    private makeRoomFree(room: Room, world: World) {
        room.borderItems
        .filter(item => item instanceof Door)
        .forEach((door: Door) => {
            door.setMaterial(world.materials.door);
        });
    }

    private makeRoomReserved(room: Room, world: World) {
        room.borderItems
        .filter(item => item instanceof Door)
        .forEach((door: Door) => {
            door.setMaterial(world.materials.doorClosed);
        });
    }
}
