import { WorldItem } from '../../../world/world_items/WorldItem';
import { Room } from '../../../world/world_items/item_types/room/Room';
import { World } from '../../../world/World';
import { LightSwitcher } from './LightSwitcher';

/**
 * Can turn on and off the lights for a given room
 */
export class NormalLightSwitcher implements LightSwitcher {

    public on(room: Room, world: World): Promise<void> {
        const items = [room, ...room.children, ...room.neighbours];
        items.forEach(item => this.excludeMeshesForWorldItem(item, world));

        return Promise.resolve();
    }

    private excludeMeshesForWorldItem(worldItem: WorldItem, world: World) {
        worldItem
            .getAllMeshes()
            .filter(mesh => mesh.name !== 'room-label')
            .forEach(mesh => {
                const index = world.hemisphericLight.excludedMeshes.indexOf(mesh);

                if (index !== -1) {
                    world.hemisphericLight.excludedMeshes.splice(index, 1);
                }
            });
    }

    public off(room: Room, world: World): Promise<void> {
        const items = [room, ...room.children, ...room.neighbours];
        items.forEach(item => this.includeMeshesForWorldItem(item, world));

        return Promise.resolve();
    }

    private includeMeshesForWorldItem(worldItem: WorldItem, world: World) {
        worldItem.getAllMeshes()
            .filter(mesh => mesh.name !== 'room-label')
            .forEach(mesh => {
                const index = world.hemisphericLight.excludedMeshes.indexOf(mesh);

                if (index === -1) {
                    world.hemisphericLight.excludedMeshes.push(mesh);
                }
            });
    }
}
