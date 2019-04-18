import { ActionHandler } from '../../../engine/actions/ActionHandler';
import { World } from '../../model/World';
import { GameActionType } from '../GameActionType';
import { Room } from '../../../engine/world_items/Room';
import { Door } from '../../model/creature/type/Door';


export class RoomReservationAction implements ActionHandler {
    private reservedRooms: Room[] = [];

    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.DAY_PASSED:
                const room = this.getRandomRoom(world);
                if (this.reservedRooms) {
                    this.reservedRooms.forEach(reservedRoom => this.makeRoomFree(reservedRoom, world));
                }
                this.makeRoomReserved(room, world);
                this.reservedRooms = [room];
                break;
            default:
                break;
        }
    }

    private getRandomRoom(world: World): Room {
        const rooms = world.gameObjects.filter(gameObj => gameObj.name === 'room');

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
