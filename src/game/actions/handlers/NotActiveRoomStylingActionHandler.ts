import { ActionHandler } from '../ActionHandler';
import { World } from '../../model/World';
import { ContainerWorldItem } from '../../world_items/ContainerWorldItem';
import { WorldItem } from '../../world_items/WorldItem';

export class NotActiveRoomStylingActionHandler implements ActionHandler {

    private prevActiveRoom: WorldItem = null;

    public sendAction(type: string, world: World, ...payload: any[]) {

        switch (type) {
            case 'MOVE':
                this.styleItemsInNotActiveRooms(world);
                return;
            default:
                return;
        }
    }

    private styleItemsInNotActiveRooms(world: World) {
        const rooms = world.gameObjects.filter(gameObj => gameObj.name === 'room');

        // world.nightLight.excludedMeshes = [];

        const intersectingRoom = rooms.filter(room => room.mesh.intersectsMesh(world.player.mesh))[0];

        if (intersectingRoom !== this.prevActiveRoom && intersectingRoom) {
            // world.hemisphericLight.setEnabled(false);
            world.hemisphericLight.excludedMeshes.splice(0, 40);
            rooms.forEach(room => {
                if (room === intersectingRoom) {
                    this.setDefaultMaterialForRoom(<ContainerWorldItem> room, world);
                } else {
                    this.setDarkMaterialForRoom(<ContainerWorldItem> room, world);
                }
            });

            // world.hemisphericLight.setEnabled(true);
        }

        this.prevActiveRoom = intersectingRoom;
    }

    private setDarkMaterialForRoom(room: ContainerWorldItem, world: World) {
        room.children.forEach(child => {
            world.hemisphericLight.excludedMeshes.push(child.mesh);
        });
    }

    private setDefaultMaterialForRoom(room: ContainerWorldItem, world: World) {
        room.children.forEach(child => {
            // world.nightLight.excludedMeshes.push(child.mesh);
        });
    }
}
