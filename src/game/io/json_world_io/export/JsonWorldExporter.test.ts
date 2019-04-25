import { JsonDefaultItemExporter } from './serializers/JsonDefaultItemExporter';
import { JsonWorldExporter } from './JsonWorldExporter';
import { World } from '../../../model/World';
import sinon = require('sinon');
import { WorldItem } from '../../../world_items/WorldItem';
import { Player } from '../../../world_items/Player';

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
                dimensions: <any> {
                    serialize: sinon.spy()
                },
                gameObjects: [<WorldItem> wallMock, <WorldItem> floorMock, <Player> playerMock]
            };

            const serialize = sinon.stub();
            const defaultSerializer: Partial<JsonDefaultItemExporter> = {
                serialize
            };

            const jsonWorldSerializer = new JsonWorldExporter(<JsonDefaultItemExporter> defaultSerializer);

            jsonWorldSerializer.export(<World> worldMock);

            sinon.assert.calledTwice(serialize);
        });
    });
});
