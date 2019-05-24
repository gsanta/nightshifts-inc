import { World } from '../../../world/World';
import { GameActionType } from '../../GameActionType';
import { ActionHandler } from '../../ActionHandler';
import { Scene, StandardMaterial, Color3 } from '@babylonjs/core';
import { GameConstants } from '../../../GameConstants';
import { WorldItem } from '../../../world/world_items/item_types/WorldItem';
const colors = GameConstants.colors;

export class RoomReservationAction implements ActionHandler {
    private reservedRooms: WorldItem[] = [];
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

    private getRandomRoom(world: World): WorldItem {
        const rooms = world.worldItems.filter(gameObj => gameObj.type === 'room');

        const randomRoomIndex = Math.floor(Math.random() * rooms.length);

        return <WorldItem> rooms[randomRoomIndex];
    }

    private makeRoomFree(room: WorldItem, world: World) {
        room.neighbours
        .filter(item => item.type === 'door')
        .forEach(door => {
            // door.setMaterial(door.material);
        });
    }

    private makeRoomReserved(room: WorldItem, world: World) {
        if (!this.reservedRoomMaterial) {
            this.reservedRoomMaterial = this.createReservedRoomMaterial(world.scene);
        }

        room.neighbours
        .filter(item => item.type === 'door')
        .forEach(door => {
            // door.setMaterial(this.reservedRoomMaterial);
        });
    }

    private createReservedRoomMaterial(scene: Scene): StandardMaterial {
        const doorClosedMaterial = new StandardMaterial('door-closed-material', scene);
        doorClosedMaterial.diffuseColor = Color3.FromHexString(colors.doorClosed);

        return doorClosedMaterial;
    }
}
