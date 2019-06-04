
import * as sinon from 'sinon';
import { WorldItemTranslator } from './WorldItemToRealWorldCoordinateMapper';
import { WorldItemToWorldCenterTranslatorDecorator } from './WorldItemToWorldCenterTranslatorDecorator';
import { Vector2Model } from '../../../model/utils/Vector2Model';
import { expect } from 'chai';
import { World } from '../../World';
import { Polygon } from '@nightshifts.inc/geometry';
declare const describe, beforeEach, it;

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
            const worldMock: Partial<World> = { dimensions: new Vector2Model(1, 1) };
            const worldItemToWorldCenterTranslatorDecorator = new WorldItemToWorldCenterTranslatorDecorator(
                <World> worldMock, <WorldItemTranslator> decoratedGameObjectTranslator
            );


            const boundingBox: Partial<Polygon> = {};
            getTranslateStub.withArgs(boundingBox).returns(Polygon.createRectangle(1, 1, 1, 1));
            worldItemToWorldCenterTranslatorDecorator.getTranslate(<Polygon> boundingBox);

            sinon.assert.called(getTranslateStub);
        });

        it ('translates the vector to world center', () => {
            const worldMock: Partial<World> = { dimensions: new Vector2Model(5, 5) };

            const worldItemToWorldCenterTranslatorDecorator = new WorldItemToWorldCenterTranslatorDecorator(
                <World> worldMock, <WorldItemTranslator> decoratedGameObjectTranslator
            );


            const boundingBox: Partial<Polygon> = {};
            getTranslateStub.returns(Polygon.createRectangle(1, 1, 1, 1));

            const polygon = worldItemToWorldCenterTranslatorDecorator.getTranslate(<Polygon> boundingBox);

            expect(polygon).to.eql(Polygon.createRectangle(-1.5, -1.5, 1, 1));
        });
    });
});
