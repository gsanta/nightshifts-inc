import { ActionHandler } from '../ActionHandler';
import { World } from '../../model/World';
import { ContainerWorldItem } from '../../world_items/ContainerWorldItem';

export class NotActiveRoomStylingActionHandler implements ActionHandler {

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

        rooms.forEach(room => {
            if (room.mesh.intersectsMesh(world.player.mesh)) {
                this.setDefaultMaterialForRoom(<ContainerWorldItem> room);
            } else {
                this.setDarkMaterialForRoom(<ContainerWorldItem> room);
            }
        });
    }

    private setDarkMaterialForRoom(room: ContainerWorldItem) {
        room.children.forEach(child => {
            if (child.materials.dark) {
                child.mesh.material = child.materials.dark;
            }
        });
    }

    private setDefaultMaterialForRoom(room: ContainerWorldItem) {
        room.children.forEach(child => {
            if (child.materials.default) {
                child.mesh.material = child.materials.default;
            }
        });
    }
}
