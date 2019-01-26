import { WorldMapGenerator } from './WorldMapGenerator';
import sinon = require('sinon');
import { expect } from 'chai';
import { Rectangle, GameObject } from 'game-worldmap-generator';
import { MeshFactory } from './deserializer/factories/MeshFactory';

describe('WorldMapGenerator', () => {
    describe('create', () => {
        it ('creates a worldmap based on a string input map', async () => {
            const createWallStub = sinon.stub();
            const wallSpy = sinon.spy();
            createWallStub.returns(wallSpy);
            const createFloorStub = sinon.stub();
            const floorSpy = sinon.spy();
            createFloorStub.returns(floorSpy);

            const meshFactoryMock: Partial<MeshFactory> = {
                createWall: createWallStub,
                createFloor: createFloorStub,
            };

            const gameObject1: GameObject = <GameObject> {
                type: 'W',
                name: 'wall',
                dimensions: new Rectangle(1, 1, 2, 3)
            };

            const gameObject2: GameObject = <GameObject> {
                type: 'F',
                name: 'floor',
                dimensions: new Rectangle(0, 0, 5, 5)
            };

            const worldmapGenerator = new WorldMapGenerator(<MeshFactory> meshFactoryMock, 1);
            const worldMap = await worldmapGenerator.create([gameObject1, gameObject2]);

            expect(worldMap.gameObjects).to.have.members([wallSpy, floorSpy]);

            sinon.assert.calledWith(createWallStub, gameObject1);
            sinon.assert.calledWith(createFloorStub, gameObject2);
        });
    });
});
