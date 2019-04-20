import { Light, Mesh } from 'babylonjs';
import { WorldItem } from '../../../game/world_items/WorldItem';
import { LightHandler } from './LightHandler';
import sinon = require('sinon');
import { BabylonMeshWrapper } from '../../wrappers/babylon/BabylonMeshWrapper';
import { expect } from 'chai';

describe('LightHandler', () => {
    describe('enableLight', () => {
        it ('removes the mesh from the `excludedMeshes` array', () => {
            const mesh = sinon.spy();

            const worldItemMock: Partial<WorldItem> = {
                mesh: <BabylonMeshWrapper> <unknown> {
                    wrappedMesh: mesh
                }
            };

            const lightMock: Partial<Light> = {
                excludedMeshes: [<Mesh> <unknown> mesh]
            };


            const lightHandler = new LightHandler(<Light> lightMock);
            lightHandler.enableLight(<WorldItem> worldItemMock);

            expect(lightMock.excludedMeshes.length).to.eq(0);
        });
    });

    describe('disableLight', () => {
        it ('adds the mesh to the `excludedMeshes` array', () => {
            const mesh = sinon.spy();

            const worldItemMock: Partial<WorldItem> = {
                mesh: <BabylonMeshWrapper> <unknown> {
                    wrappedMesh: mesh
                }
            };

            const lightMock: Partial<Light> = {
                excludedMeshes: []
            };


            const lightHandler = new LightHandler(<Light> lightMock);
            lightHandler.disableLight(<WorldItem> worldItemMock);

            expect(lightMock.excludedMeshes.length).to.eq(1);
        });
    });
});
