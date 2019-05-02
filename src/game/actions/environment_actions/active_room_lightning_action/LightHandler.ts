import { Light } from 'babylonjs';
import { WorldItem } from '../../../world/world_items/WorldItem';
import { Room } from '../../../world/world_items/room/Room';
import { World } from '../../../world/World';


export class LightHandler {

    enableLight(room: Room, world: World) {
        const items = [room, ...room.children, ...room.neighbours];
        items.forEach(item => this.excludeMeshesForWorldItem(item, world));
    }

    private excludeMeshesForWorldItem(worldItem: WorldItem, world: World) {
        worldItem.getAllMeshes().forEach(mesh => {
            const index = world.hemisphericLight.excludedMeshes.indexOf(mesh);

            if (index !== -1) {
                world.hemisphericLight.excludedMeshes.splice(index, 1);
            }
        });
    }

    disableLight(room: Room, world: World) {
        const items = [room, ...room.children, ...room.neighbours];
        items.forEach(item => this.includeMeshesForWorldItem(item, world));
    }

    private includeMeshesForWorldItem(worldItem: WorldItem, world: World) {
        worldItem.getAllMeshes().forEach(mesh => {
            const index = world.hemisphericLight.excludedMeshes.indexOf(mesh);

            if (index === -1) {
                world.hemisphericLight.excludedMeshes.push(mesh);
            }
        });
    }
}
