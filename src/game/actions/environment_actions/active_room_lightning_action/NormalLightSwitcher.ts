import { AbstractMesh } from '@babylonjs/core';
import { Rectangle } from '@nightshifts.inc/geometry';
import * as _ from 'lodash';
import { World } from '../../../world/World';
import { LightSwitcher } from './LightSwitcher';
import { WorldItem } from '../../../world/world_items/item_types/WorldItem';

/**
 * Can turn on and off the lights for a given room
 */
export class NormalLightSwitcher implements LightSwitcher {

    public on(room: WorldItem, world: World): Promise<void> {
        const childMeshes = _.chain([room, ...room.getChildren()]).map(item => item.getAllMeshes()).flatten().value();
        const neighbourMeshes = _.chain(room.neighbours)
            .filter(item => item.type === 'wall')
            .map(item => this.getMeshesThatAreInsideTheRoom(item, room)).flatten().value();

        this.excludeMeshesForWorldItem([...childMeshes, ...neighbourMeshes], world);

        return Promise.resolve();
    }

    private getMeshesThatAreInsideTheRoom(wall: WorldItem, room: WorldItem): AbstractMesh[] {
        if (wall.mesh.getChildMeshes().length !== 2) {
            throw new Error(
                `This method should be used for 'border' items, where the two children represent the two sides, but it has` +
                `${wall.mesh.getChildMeshes().length} children`
            );
        }

        return wall.mesh.getChildMeshes().filter(mesh => this.isMeshInsideTheRoom(mesh, room));
    }

    private isMeshInsideTheRoom(mesh: AbstractMesh, room: WorldItem) {
        const boundingBox = room.getBoundingBox();
        const meshPosition = mesh.getAbsolutePosition();

        return boundingBox.contains(new Rectangle(meshPosition.x, meshPosition.z, 0.01, 0.01));
    }

    private excludeMeshesForWorldItem(meshes: AbstractMesh[], world: World) {
        meshes.filter(mesh => mesh.name !== 'room-label')
            .forEach(mesh => {
                const index = world.hemisphericLight.excludedMeshes.indexOf(mesh);

                if (index !== -1) {
                    world.hemisphericLight.excludedMeshes.splice(index, 1);
                }
            });
    }

    public off(room: WorldItem, world: World): Promise<void> {
        const childMeshes = _.chain([room, ...room.getChildren()]).map(item => item.getAllMeshes()).flatten().value();
        const neighbourMeshes = _.chain(room.neighbours)
            .filter(item => item.type === 'wall')
            .map(item => {
                if (item.neighbours.length === 1) {
                    return <AbstractMesh[]> item.mesh.getChildren();
                } else {
                    return this.getMeshesThatAreInsideTheRoom(item, room);
                }
            })
            .flatten()
            .value();

        this.includeMeshesForWorldItem([...childMeshes, ...neighbourMeshes], world);

        return Promise.resolve();
    }

    private includeMeshesForWorldItem(meshes: AbstractMesh[], world: World) {
        meshes.filter(mesh => mesh.name !== 'room-label')
        .forEach(mesh => {
            const index = world.hemisphericLight.excludedMeshes.indexOf(mesh);

            if (index === -1) {
                world.hemisphericLight.excludedMeshes.push(mesh);
            }
        });
    }
}
