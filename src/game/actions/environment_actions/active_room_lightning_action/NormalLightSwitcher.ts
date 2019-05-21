import { WorldItem } from '../../../world/world_items/item_types/WorldItem';
import { Room } from '../../../world/world_items/item_types/Room';
import { World } from '../../../world/World';
import { LightSwitcher } from './LightSwitcher';
import { Wall } from '../../../world/world_items/item_types/Wall';
import { VectorModel } from '../../../model/core/VectorModel';
import { Rectangle } from '@nightshifts.inc/geometry';

/**
 * Can turn on and off the lights for a given room
 */
export class NormalLightSwitcher implements LightSwitcher {

    public on(room: Room, world: World): Promise<void> {
        const items = [room, ...room.children];
        items.forEach(item => this.excludeMeshesForWorldItem(item, world));

        room.neighbours.filter(neighbour => neighbour instanceof Wall)
        .forEach((wall: Wall) => {
            const boundingBox = room.getBoundingBox();
            const child1Pos = wall.mesh.getChildMeshes()[0].getAbsolutePosition();
            if (boundingBox.contains(new Rectangle(child1Pos.x, child1Pos.z, 0.01, 0.01))) {
                const index = world.hemisphericLight.excludedMeshes.indexOf(wall.mesh.getChildMeshes()[0]);

                if (index !== -1) {
                    world.hemisphericLight.excludedMeshes.splice(index, 1);
                }
            }

            const child2Pos = wall.mesh.getChildMeshes()[1].getAbsolutePosition();
            if (boundingBox.contains(new Rectangle(child2Pos.x, child2Pos.z, 0.01, 0.01))) {
                const index = world.hemisphericLight.excludedMeshes.indexOf(wall.mesh.getChildMeshes()[1]);

                if (index !== -1) {
                    world.hemisphericLight.excludedMeshes.splice(index, 1);
                }
            }
        });

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
        const items = [room, ...room.children];
        items.forEach(item => this.includeMeshesForWorldItem(item, world));
        room.neighbours.filter(neighbour => neighbour instanceof Wall)
            .forEach((wall: Wall) => {
                const boundingBox = room.getBoundingBox();
                const child1Pos = wall.mesh.getChildMeshes()[0].getAbsolutePosition();

                if (wall.neighbours.length === 1) {
                    let index = world.hemisphericLight.excludedMeshes.indexOf(wall.mesh.getChildMeshes()[0]);

                    if (index === -1) {
                        world.hemisphericLight.excludedMeshes.push(wall.mesh.getChildMeshes()[0]);
                    }

                    index = world.hemisphericLight.excludedMeshes.indexOf(wall.mesh.getChildMeshes()[1]);

                    if (index === -1) {
                        world.hemisphericLight.excludedMeshes.push(wall.mesh.getChildMeshes()[1]);
                    }
                } else {
                    if (boundingBox.contains(new Rectangle(child1Pos.x, child1Pos.z, 0.01, 0.01))) {
                        const index = world.hemisphericLight.excludedMeshes.indexOf(wall.mesh.getChildMeshes()[0]);

                        if (index === -1) {
                            world.hemisphericLight.excludedMeshes.push(wall.mesh.getChildMeshes()[0]);
                        }
                    }

                    const child2Pos = wall.mesh.getChildMeshes()[1].getAbsolutePosition();
                    if (boundingBox.contains(new Rectangle(child2Pos.x, child2Pos.z, 0.01, 0.01))) {
                        const index = world.hemisphericLight.excludedMeshes.indexOf(wall.mesh.getChildMeshes()[1]);

                        if (index === -1) {
                            world.hemisphericLight.excludedMeshes.push(wall.mesh.getChildMeshes()[1]);
                        }
                    }
                }

            });

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
