import { WorldMapGenerator } from './WorldMapGenerator';
import { MeshFactory } from '../model/core/MeshFactory';
import { VectorModel } from '../model/core/VectorModel';
import sinon = require('sinon');
import { expect } from 'chai';
import { Rectangle, GameObject, GameObjectParser } from 'game-worldmap-generator';
import * as fs from 'fs';


describe('WorldMapGenerator', () => {
    describe('create', () => {
        it('creates a worldmap based on a string input map', () => {
            const file = fs.readFileSync(__dirname + '/../../assets/testWorldMap.gwm', 'utf8');

            const createWallStub = sinon.stub();
            const wallSpy = sinon.spy();
            createWallStub.returns(wallSpy);
            const createWindowStub = sinon.stub();
            const windowSpy = sinon.spy();
            createWindowStub.returns(windowSpy);
            const createDoorStub = sinon.stub();
            const doorSpy = sinon.spy();
            createDoorStub.returns(doorSpy);

            const meshFactoryMock: Partial<MeshFactory> = {
                createWall: createWallStub,
                createWindow: createWindowStub,
                createDoor: createDoorStub
            };

            const worldmapGenerator = new WorldMapGenerator(new GameObjectParser(), <MeshFactory> meshFactoryMock, 1);
            const worldMap = worldmapGenerator.create(file);
            expect(worldMap.gameObjects).to.have.members(
                [wallSpy, wallSpy, wallSpy, wallSpy, wallSpy, wallSpy, wallSpy, windowSpy, windowSpy, doorSpy]
            );
            expect(createWallStub.getCall(0).args[0]).to.eql(new VectorModel(1, 5, 1));
            expect(createWallStub.getCall(0).args[1]).to.eql(new VectorModel(1, 10, 7));
            expect(createWindowStub.getCall(0).args[0]).to.eql(new VectorModel(4, 5, 1));
            expect(createWindowStub.getCall(0).args[1]).to.eql(new VectorModel(2, 10, 1));
        });
    });
});
