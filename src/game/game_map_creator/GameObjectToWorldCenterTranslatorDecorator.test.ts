
import * as sinon from 'sinon';
import { GameObjectTranslator } from './GameObjectToRealWorldCoordinateWrapper';
import { GameObjectToWorldCenterTranslatorDecorator } from './GameObjectToWorldCenterTranslatorDecorator';
import { Vector2Model } from '../model/utils/Vector2Model';
import { GameObject } from 'game-worldmap-generator';
import { expect } from 'chai';

describe('GameObjectToWorldCenterTranslatorDecorator', () => {
    describe('getTranslate', () => {
        let getTranslateStub: sinon.SinonStub;
        let decoratedGameObjectTranslator: Partial<GameObjectTranslator>;

        beforeEach(() => {
            getTranslateStub = sinon.stub();
            decoratedGameObjectTranslator = {
                getTranslate: getTranslateStub
            };
        });

        it ('calls the decorated GameObjectTranslator', () => {
            const gameObjectToWorldCenterTranslatorDecorator =
                new GameObjectToWorldCenterTranslatorDecorator(new Vector2Model(1, 1), 1, <GameObjectTranslator> decoratedGameObjectTranslator);


            const gameObject: Partial<GameObject> = {};
            getTranslateStub.withArgs(gameObject).returns(new Vector2Model(1, 1));
            gameObjectToWorldCenterTranslatorDecorator.getTranslate(<GameObject> gameObject);

            sinon.assert.called(getTranslateStub);
        });

        it ('translates the vector to world center', () => {
            const worldDimensions = new Vector2Model(5, 5);
            const gameObjectToMeshSizeRatio = 2;

            const gameObjectToWorldCenterTranslatorDecorator = new GameObjectToWorldCenterTranslatorDecorator(
                worldDimensions, gameObjectToMeshSizeRatio, <GameObjectTranslator> decoratedGameObjectTranslator);


            const gameObject: Partial<GameObject> = {};
            getTranslateStub.returns(new Vector2Model(1, 1));

            const vector = gameObjectToWorldCenterTranslatorDecorator.getTranslate(<GameObject> gameObject);

            expect(vector).to.eql(new Vector2Model(-1.5, -1.5));
        });
    });
});
