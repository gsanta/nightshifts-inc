import { Light, Mesh } from 'babylonjs';
import { WorldItem } from '../../world/world_items/WorldItem';
import { LightHandler } from './LightHandler';
import { expect } from 'chai';
import { Room } from '../../world/world_items/room/Room';
import { World } from '../../world/World';

const createWorldMock = (excludedMeshes: Mesh[]): World => {

    const lightMock: Partial<Light> = {
        excludedMeshes: excludedMeshes
    };

    return <World> {
        hemisphericLight: <any> lightMock
    };
};

const createRoomMock = (roomMesh: Partial<Mesh>, childMeshes: Partial<Mesh>[], neighbourMeshes: Partial<Mesh>[]): Room => {

    const children = childMeshes.map(mesh => {
        return <Partial<WorldItem>> {
            getAllMeshes: () => [mesh]
        };
    });

    const neighbours = neighbourMeshes.map(mesh => {
        return <Partial<WorldItem>> {
            getAllMeshes: () => [mesh]
        };
    });


    return <Room> {
        mesh: <any> roomMesh,
        children: children,
        neighbours: neighbours,
        getAllMeshes: () => [roomMesh]
    };
};

describe('LightHandler', () => {
    describe('enableLight', () => {
        it ('removes the mesh from the `excludedMeshes` array', () => {
            const wallMesh: Partial<Mesh> = {
                name: 'wall'
            };

            const tableMesh: Partial<Mesh> = {
                name: 'table'
            };

            const roomMesh: Partial<Mesh> = {
                name: 'room'
            };

            const world = createWorldMock([<Mesh> roomMesh, <Mesh> wallMesh, <Mesh> tableMesh]);
            const room = createRoomMock(roomMesh, [wallMesh], [tableMesh]);

            const lightHandler = new LightHandler();

            expect(world.hemisphericLight.excludedMeshes.length).to.eq(3);
            lightHandler.enableLight(room, world);
            expect(world.hemisphericLight.excludedMeshes.length).to.eq(0);
        });
    });

    describe('disableLight', () => {
        it ('adds the mesh to the `excludedMeshes` array', () => {
            const wallMesh: Partial<Mesh> = {
                name: 'wall'
            };

            const tableMesh: Partial<Mesh> = {
                name: 'table'
            };

            const roomMesh: Partial<Mesh> = {
                name: 'room'
            };

            const world = createWorldMock([]);
            const room = createRoomMock(roomMesh, [wallMesh], [tableMesh]);

            const lightHandler = new LightHandler();

            expect(world.hemisphericLight.excludedMeshes.length).to.eq(0);
            lightHandler.disableLight(room, world);
            expect(world.hemisphericLight.excludedMeshes).to.eql([<Mesh> roomMesh, <Mesh> wallMesh, <Mesh> tableMesh]);
        });
    });
});
