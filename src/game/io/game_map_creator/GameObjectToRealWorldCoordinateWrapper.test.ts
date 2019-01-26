import { Rectangle, GameObject } from 'game-worldmap-generator';
import { expect } from 'chai';
import { Direction } from '../../model/utils/Direction';
import { GameObjectToRealWorldCoordinateWrapper } from './GameObjectToRealWorldCoordinateWrapper';
import { Vector2Model } from '../../model/utils/Vector2Model';


describe('GameObjectToRealWorldCoordinateWrapper', () => {
    describe('getTranslate', () => {
        it ('translates the mesh correctly when docking to MIDDLE', () => {
            const gameObjectToRealWorldCoordinateWrapper = new GameObjectToRealWorldCoordinateWrapper(new Vector2Model(5, 5), 1);
            const gameObject: Partial<GameObject> = {
                dimensions: new Rectangle(3, 3, 2, 2)
            };

            const translate = gameObjectToRealWorldCoordinateWrapper.getTranslate(<GameObject> gameObject);
            expect(translate).to.eql(new Vector2Model(4, 4));
        });

        it ('translates the mesh correctly when docking to NORTH_WEST', () => {
            const gameObjectToRealWorldCoordinateWrapper = new GameObjectToRealWorldCoordinateWrapper(new Vector2Model(5, 5), 1);
            const gameObject: Partial<GameObject> = {
                dimensions: new Rectangle(3, 3, 2, 2),
                additionalData: {
                    dock: Direction.NORTH_WEST
                }
            };

            const translate = gameObjectToRealWorldCoordinateWrapper.getTranslate(<GameObject> gameObject);
            expect(translate).to.eql(new Vector2Model(3, 3));
        });

        it ('translates the mesh correctly when docking to NORTH_EAST', () => {
            const gameObjectToRealWorldCoordinateWrapper = new GameObjectToRealWorldCoordinateWrapper(new Vector2Model(5, 5), 1);
            const gameObject: Partial<GameObject> = {
                dimensions: new Rectangle(3, 3, 2, 2),
                additionalData: {
                    dock: Direction.NORTH_EAST
                }
            };

            const translate = gameObjectToRealWorldCoordinateWrapper.getTranslate(<GameObject> gameObject);
            expect(translate).to.eql(new Vector2Model(5, 3));
        });

        it ('translates the mesh correctly when docking to SOUTH_WEST', () => {
            const gameObjectToRealWorldCoordinateWrapper = new GameObjectToRealWorldCoordinateWrapper(new Vector2Model(5, 5), 1);
            const gameObject: Partial<GameObject> = {
                dimensions: new Rectangle(3, 3, 2, 2),
                additionalData: {
                    dock: Direction.SOUTH_WEST
                }
            };

            const translate = gameObjectToRealWorldCoordinateWrapper.getTranslate(<GameObject> gameObject);
            expect(translate).to.eql(new Vector2Model(3, 5));
        });

        it ('translates the mesh correctly when docking to SOUTH_EAST', () => {
            const gameObjectToRealWorldCoordinateWrapper = new GameObjectToRealWorldCoordinateWrapper(new Vector2Model(5, 5), 1);
            const gameObject: Partial<GameObject> = {
                dimensions: new Rectangle(3, 3, 2, 2),
                additionalData: {
                    dock: Direction.SOUTH_EAST
                }
            };

            const translate = gameObjectToRealWorldCoordinateWrapper.getTranslate(<GameObject> gameObject);
            expect(translate).to.eql(new Vector2Model(5, 5));
        });
    });
});
