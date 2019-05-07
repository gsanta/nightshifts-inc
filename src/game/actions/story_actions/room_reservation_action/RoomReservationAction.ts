import { World } from '../../../world/World';
import { GameActionType } from '../../GameActionType';
import { Room } from '../../../world/world_items/room/Room';
import { ActionHandler } from '../../ActionHandler';
import { Door } from '../../../world/world_items/door/Door';
import { Scene, StandardMaterial, Color3 } from '@babylonjs/core';
import { GameConstants } from '../../../GameConstants';
const colors = GameConstants.colors;

export class RoomReservationAction implements ActionHandler {
    private reservedRooms: Room[] = [];
    private reservedRoomMaterial: StandardMaterial;

    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.DAY_PASSED:
                const room = this.getRandomRoom(world);

                this.reservedRooms.forEach(reservedRoom => this.makeRoomFree(reservedRoom, world));
                this.makeRoomReserved(room, world);
                this.reservedRooms = [room];

                break;
            default:
                break;
        }
    }

    private getRandomRoom(world: World): Room {
        const rooms = world.worldItems.filter(gameObj => gameObj.type === 'room');

        const randomRoomIndex = Math.floor(Math.random() * rooms.length);

        return <Room> rooms[randomRoomIndex];
    }

    private makeRoomFree(room: Room, world: World) {
        room.borderItems
        .filter(item => item instanceof Door)
        .forEach((door: Door) => {
            door.setMaterial(door.material);
        });
    }

    private makeRoomReserved(room: Room, world: World) {
        if (!this.reservedRoomMaterial) {
            this.reservedRoomMaterial = this.createReservedRoomMaterial(world.scene);
        }

        room.borderItems
        .filter(item => item instanceof Door)
        .forEach((door: Door) => {
            door.setMaterial(this.reservedRoomMaterial);
        });
    }

    private createReservedRoomMaterial(scene: Scene): StandardMaterial {
        const doorClosedMaterial = new StandardMaterial('door-closed-material', scene);
        doorClosedMaterial.diffuseColor = Color3.FromHexString(colors.doorClosed);

        return doorClosedMaterial;
    }
}
