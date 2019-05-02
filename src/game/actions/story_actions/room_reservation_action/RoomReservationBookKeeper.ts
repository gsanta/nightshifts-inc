import { Room } from '../../../world/world_items/room/Room';
import { World } from '../../../world/World';
import { RoomReservationStrategy } from './RoomReservationStrategy';
import { Door } from '../../../world/world_items/door/Door';
import { StandardMaterial, Scene, Color3 } from '@babylonjs/core';
import { GameConstants } from '../../../GameConstants';
const colors = GameConstants.colors;

export class RoomReservationBookKeeper {
    private reservedRoom: Room;
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

    private makeRoomFree(room: Room) {
        room.borderItems
        .filter(item => item instanceof Door)
        .forEach((door: Door) => {
            door.setMaterial(door.material);
        });
    }

    private makeRoomReserved(room: Room) {
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
