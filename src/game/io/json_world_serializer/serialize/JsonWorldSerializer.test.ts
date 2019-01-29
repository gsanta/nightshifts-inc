import { JsonDefaultItemSerializer } from './serializers/JsonDefaultItemSerializer';
import { JsonWorldSerializer } from './JsonWorldSerializer';
import { World } from '../../../model/World';
import sinon = require('sinon');
import { MeshModel } from '../../../model/core/MeshModel';
import { Player } from '../../../model/creature/type/Player';
import { expect } from 'chai';

describe('JsonWorldSerializer', () => {
    describe('serialize', () => {
        it.only ('creates the serialized version of a World', () => {
            const wallMock = {
                name: 'wall'
            };

            const playerMock = {
                name: 'player'
            };

            const floorMock = {
                name: 'floor'
            };

            const worldMock: Partial<World> = {
                gameObjects: [<MeshModel> wallMock],
                floor: <MeshModel> floorMock,
                player: <Player> playerMock
            };

            const serialize = sinon.stub();
            const defaultSerializer: Partial<JsonDefaultItemSerializer> = {
                serialize
            };

            const jsonWorldSerializer = new JsonWorldSerializer(<JsonDefaultItemSerializer> defaultSerializer);

            jsonWorldSerializer.serialize(<World> worldMock);

            sinon.assert.calledThrice(serialize);
        });
    });
});
