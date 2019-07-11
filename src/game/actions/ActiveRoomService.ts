import { WorldItem } from '../world/world_items/item_types/WorldItem';
import { Vector3 } from '@babylonjs/core';
import { World } from '../world/World';

export class ActiveRoomService {
    private rooms: WorldItem[];

    constructor(world: World) {
        this.rooms = world.getWorldItemsByName('room');
    }

    public setActiveRoomAtPoint(point: Vector3) {
        this.deactivatePrevActiveRoom();
        this.activateRoomAtPoint(point);
    }

    private deactivatePrevActiveRoom() {
        this.rooms.filter(room => room.isActive).forEach(room => room.isActive = false);
    }

    private activateRoomAtPoint(point: Vector3) {
        const activeRoom = this.rooms.find(room => room.mesh.intersectsPoint(point));
        if (activeRoom) {
            activeRoom.isActive = true;
        }
    }
}