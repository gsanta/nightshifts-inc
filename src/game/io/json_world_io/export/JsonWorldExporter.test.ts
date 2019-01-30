import { JsonDefaultItemExporter } from './serializers/JsonDefaultItemExporter';
import { JsonWorldSerializer } from './JsonWorldExporter';
import { World } from '../../../model/World';
import sinon = require('sinon');
import { MeshModel } from '../../../model/core/MeshModel';
import { Player } from '../../../model/creature/type/Player';

describe('JsonWorldExporter', () => {
    describe('export', () => {
        it ('creates the serialized version of a World', () => {
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
                gameObjects: [<MeshModel> wallMock, <MeshModel> floorMock],
                player: <Player> playerMock
            };

            const serialize = sinon.stub();
            const defaultSerializer: Partial<JsonDefaultItemExporter> = {
                serialize
            };

            const jsonWorldSerializer = new JsonWorldSerializer(<JsonDefaultItemExporter> defaultSerializer);

            jsonWorldSerializer.export(<World> worldMock);

            sinon.assert.calledThrice(serialize);
        });
    });
});
