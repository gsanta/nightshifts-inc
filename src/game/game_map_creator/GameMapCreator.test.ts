import { GameMapCreator } from './GameMapCreator';
import { MeshFactory } from '../model/core/MeshFactory';
import { GameObject } from '../game_object_parser/GameObject';
import { Rectangle } from '../model/core/SceneModel';
import { VectorModel } from '../model/core/VectorModel';
import sinon = require('sinon');
import { expect } from 'chai';


describe('GameObjectParser', () => {
    describe('parse', () => {
        it('creates GameObjects from a GameMap string', () => {
            const gameObjects = [
                new GameObject('W', new Rectangle(1, 1, 3, 1)),
                new GameObject('W', new Rectangle(3, 2, 1, 4))
            ];


            const wall1 = sinon.spy();
            const wall2 = sinon.spy();
            const createWallStub = sinon.stub();

            createWallStub.withArgs(new VectorModel(1, 5, 1), new VectorModel(3, 10, 1)).returns(wall1);
            createWallStub.withArgs(new VectorModel(3, 5, 2), new VectorModel(1, 10, 4)).returns(wall2);
            const meshFactoryMock: Partial<MeshFactory> = {
                createWall: createWallStub
            };

            const gameMapCreator = new GameMapCreator(<MeshFactory> meshFactoryMock, 1);
            const gameMap = gameMapCreator.create(gameObjects);

            expect(gameMap.gameObjects).to.have.members([wall1, wall2]);
        });
    });
});
