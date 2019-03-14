
import * as sinon from 'sinon';
import { WorldItemTranslator } from './WorldItemToRealWorldCoordinateMapper';
import { WorldItemToWorldCenterTranslatorDecorator } from './WorldItemToWorldCenterTranslatorDecorator';
import { Vector2Model } from '../../../../../model/utils/Vector2Model';
import { GwmWorldItem } from 'game-worldmap-generator';
import { expect } from 'chai';
import { World } from '../../../../../model/World';

describe('WorldItemToWorldCenterTranslatorDecorator', () => {
    describe('getTranslate', () => {
        let getTranslateStub: sinon.SinonStub;
        let decoratedGameObjectTranslator: Partial<WorldItemTranslator>;

        beforeEach(() => {
            getTranslateStub = sinon.stub();
            decoratedGameObjectTranslator = {
                getTranslate: getTranslateStub
            };
        });

        it ('calls the decorated GameObjectTranslator', () => {
            const worldItemToWorldCenterTranslatorDecorator =
                new WorldItemToWorldCenterTranslatorDecorator(1, <WorldItemTranslator> decoratedGameObjectTranslator);

            const worldMock: Partial<World> = { dimensions: new Vector2Model(1, 1) };

            const worldItem: Partial<GwmWorldItem> = {};
            getTranslateStub.withArgs(worldItem).returns(new Vector2Model(1, 1));
            worldItemToWorldCenterTranslatorDecorator.getTranslate(<GwmWorldItem> worldItem, <World> worldMock, null);

            sinon.assert.called(getTranslateStub);
        });

        it ('translates the vector to world center', () => {
            const gameObjectToMeshSizeRatio = 2;

            const worldItemToWorldCenterTranslatorDecorator = new WorldItemToWorldCenterTranslatorDecorator(
                gameObjectToMeshSizeRatio, <WorldItemTranslator> decoratedGameObjectTranslator);

            const worldMock: Partial<World> = { dimensions: new Vector2Model(5, 5) };

            const worldItem: Partial<GwmWorldItem> = {};
            getTranslateStub.returns(new Vector2Model(1, 1));

            const vector = worldItemToWorldCenterTranslatorDecorator.getTranslate(<GwmWorldItem> worldItem, <World> worldMock, null);

            expect(vector).to.eql(new Vector2Model(-1.5, -1.5));
        });
    });
});
