import { Light, Mesh } from '@babylonjs/core';
import { WorldItem } from '../../world/world_items/item_types/WorldItem';
import { NormalLightSwitcher } from './NormalLightSwitcher';
import { expect } from 'chai';
import { World } from '../../world/World';
declare const describe, beforeEach, afterEach, it;

const createWorldMock = (excludedMeshes: Mesh[]): World => {

    const lightMock: Partial<Light> = {
        excludedMeshes: excludedMeshes
    };

    return <World> {
        hemisphericLight: <any> lightMock
    };
};

const createRoomMock = (roomMesh: Partial<Mesh>, childMeshes: Partial<Mesh>[], neighbourMeshes: Partial<Mesh>[]): WorldItem => {

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


    return <WorldItem> {
        mesh: <any> roomMesh,
        children: children,
        neighbours: neighbours,
        getAllMeshes: () => [roomMesh]
    };
};

describe('`LightSwitcher`', () => {
    describe(`on`, () => {
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

            const lightHandler = new NormalLightSwitcher();

            expect(world.hemisphericLight.excludedMeshes.length).to.eq(3);
            return lightHandler.on(room, world)
                .then(() => {
                    expect(world.hemisphericLight.excludedMeshes.length).to.eq(0);
                });
        });
    });

    describe(`off`, () => {
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

            const lightHandler = new NormalLightSwitcher();

            expect(world.hemisphericLight.excludedMeshes.length).to.eq(0);
            lightHandler.off(room, world);
            expect(world.hemisphericLight.excludedMeshes).to.eql([<Mesh> roomMesh, <Mesh> wallMesh, <Mesh> tableMesh]);
        });
    });
});
