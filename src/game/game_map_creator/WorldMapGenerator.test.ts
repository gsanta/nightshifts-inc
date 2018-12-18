import { WorldMapGenerator } from './WorldMapGenerator';
import { MeshFactory } from '../model/core/MeshFactory';
import { VectorModel } from '../model/core/VectorModel';
import sinon = require('sinon');
import { expect } from 'chai';
import { Rectangle, GameObject, GameObjectParser } from 'game-worldmap-generator';
import * as fs from 'fs';


describe('WorldMapGenerator', () => {
    describe('create', () => {
        it.only('creates a worldmap based on a string input map', () => {
            const file = fs.readFileSync(__dirname + '/../../assets/testWorldMap.gwm', 'utf8');
            const gameObjects = [
                new GameObject('W', new Rectangle(1, 1, 3, 1), 'world'),
                new GameObject('W', new Rectangle(3, 2, 1, 4), 'world')
            ];


            const wall1 = sinon.spy();
            const wall2 = sinon.spy();

            const createWallStub = sinon.stub();
            createWallStub.returns('wall');
            const createWindowStub = sinon.stub();
            createWindowStub.returns('window');
            const createDoorStub = sinon.stub();
            createDoorStub.returns('door');

            const meshFactoryMock: Partial<MeshFactory> = {
                createWall: createWallStub,
                createWindow: createWindowStub,
                createDoor: createDoorStub
            };

            const worldmapGenerator = new WorldMapGenerator(new GameObjectParser(), <MeshFactory> meshFactoryMock, 1);
            const worldMap = worldmapGenerator.create(file);

            expect(worldMap.gameObjects).to.have.members(
                ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'window', 'window', 'door']
            );
            expect(createWallStub)
        });
    });
    // describe('parse', () => {
    //     it('creates GameObjects from a GameMap string', () => {
    //         const gameObjects = [
    //             new GameObject('W', new Rectangle(1, 1, 3, 1), 'world'),
    //             new GameObject('W', new Rectangle(3, 2, 1, 4), 'world')
    //         ];


    //         const wall1 = sinon.spy();
    //         const wall2 = sinon.spy();
    //         const createWallStub = sinon.stub();

    //         createWallStub.withArgs(new VectorModel(1, 5, 1), new VectorModel(3, 10, 1)).returns(wall1);
    //         createWallStub.withArgs(new VectorModel(3, 5, 2), new VectorModel(1, 10, 4)).returns(wall2);
    //         const meshFactoryMock: Partial<MeshFactory> = {
    //             createWall: createWallStub
    //         };

    //         const gameMapCreator = new WorldMapGenerator(<MeshFactory> meshFactoryMock, 1);
    //         const gameMap = gameMapCreator.create(gameObjects);

    //         expect(gameMap.gameObjects).to.have.members([wall1, wall2]);
    //     });
    // });
});
