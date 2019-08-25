import { AbstractMesh } from 'babylonjs';
import { Polygon } from '@nightshifts.inc/geometry';
import * as _ from 'lodash';
import { World } from '../../model/game_objects/World';
import { LightSwitcher } from './LightSwitcher';
import { GameObject } from '../../model/game_objects/GameObject';
import { Room } from '../../model/game_objects/Room';

/**
 * Can turn on and off the lights for a given room
 */
export class NormalLightSwitcher implements LightSwitcher {

    public on(room: Room, world: World): Promise<void> {
        const childMeshes = _.chain([room, ...room.children]).map(item => [item.meshes[0]]).flatten().value();
        // const neighbourMeshes = _.chain(room.borders)
        //     .filter(item => item.type === 'wall')
        //     .map(item => this.getMeshesThatAreInsideTheRoom(item, room)).flatten().value();

        this.excludeMeshesForWorldItem([...childMeshes, /*...neighbourMeshes*/], world);

        return Promise.resolve();
    }

    private getMeshesThatAreInsideTheRoom(wall: GameObject, room: GameObject): AbstractMesh[] {
        if (wall.meshes[0].getChildMeshes().length !== 2) {
            throw new Error(
                `This method should be used for 'border' items, where the two children represent the two sides, but it has` +
                `${wall.meshes[0].getChildMeshes().length} children`
            );
        }

        return wall.meshes[0].getChildMeshes().filter(mesh => this.isMeshInsideTheRoom(mesh, room));
    }

    private isMeshInsideTheRoom(mesh: AbstractMesh, room: GameObject) {
        const boundingBox = room.boundingBox;
        const meshPosition = mesh.getAbsolutePosition();

        return (<Polygon> boundingBox).contains(Polygon.createRectangle(meshPosition.x, meshPosition.z, 0.01, 0.01));
    }

    private excludeMeshesForWorldItem(meshes: AbstractMesh[], world: World) {
        meshes.filter(mesh => mesh.name !== 'room-label')
            .forEach(mesh => {
                const index = world.environmentLight.excludedMeshes.indexOf(mesh);

                if (index !== -1) {
                    world.environmentLight.excludedMeshes.splice(index, 1);
                }
            });
    }

    public off(room: Room, world: World): Promise<void> {
        const childMeshes = _.chain([room, ...room.children]).map(item => [...item.meshes]).flatten().value();
        const borderMeshes = _.chain(room.borders).map(item => [...item.meshes]).flatten().value();

        this.includeMeshesForWorldItem([...childMeshes], world);
        this.includeMeshesForWorldItem([...borderMeshes], world);

        return Promise.resolve();
    }

    private includeMeshesForWorldItem(meshes: AbstractMesh[], world: World) {
        meshes.filter(mesh => mesh.name !== 'room-label')
        .forEach(mesh => {
            const index = world.environmentLight.excludedMeshes.indexOf(mesh);

            if (index === -1) {
                world.environmentLight.excludedMeshes.push(mesh);
            }
        });
    }
}
