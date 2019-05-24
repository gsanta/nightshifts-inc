import { World } from '../../../world/World';
import { RoomReservationStrategy } from './RoomReservationStrategy';
import { StandardMaterial, Scene, Color3 } from '@babylonjs/core';
import { GameConstants } from '../../../GameConstants';
import { WorldItem } from '../../../world/world_items/item_types/WorldItem';
const colors = GameConstants.colors;

export class RoomReservationBookKeeper {
    private reservedRoom: WorldItem;
    private roomReservationStrategy: RoomReservationStrategy;
    private world: World;
    private reservedRoomMaterial: StandardMaterial;

    constructor(roomReservationStrategy: RoomReservationStrategy, world: World) {
        this.reservedRoomMaterial = this.createReservedRoomMaterial(world.scene);
        this.roomReservationStrategy = roomReservationStrategy;
        this.world = world;
    }

    public nextDayPassed() {
        if (this.reservedRoom) {
            this.makeRoomFree(this.reservedRoom);
        }

        this.makeRoomReserved(this.roomReservationStrategy.chooseRoom(this.world.rooms));
    }

    private makeRoomFree(room: WorldItem) {
        room.neighbours
        .filter(item => item.type === 'door')
        .forEach(door => {
            // door.setMaterial(door.material);
        });
    }

    private makeRoomReserved(room: WorldItem) {
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
