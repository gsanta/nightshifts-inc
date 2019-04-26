import { Rectangle, GwmWorldItem } from 'game-worldmap-generator';
import { expect } from 'chai';
import { Direction } from '../../../model/utils/Direction';
import { WorldItemToRealWorldCoordinateMapper } from './WorldItemToRealWorldCoordinateMapper';
import { Vector2Model } from '../../../model/utils/Vector2Model';


describe('WorldItemToRealWorldCoordinateMapper', () => {
    describe('getTranslate', () => {
        it ('translates the mesh correctly when docking to MIDDLE', () => {
            const worldItemToRealWorldCoordinateMapper = new WorldItemToRealWorldCoordinateMapper(1);
            const worldItem: Partial<GwmWorldItem> = {
                dimensions: new Rectangle(3, 3, 2, 2)
            };

            const translate = worldItemToRealWorldCoordinateMapper.getTranslate(<GwmWorldItem> worldItem, null);
            expect(translate).to.eql(new Vector2Model(4, 4));
        });

        it ('translates the mesh correctly when docking to NORTH_WEST', () => {
            const worldItemToRealWorldCoordinateMapper = new WorldItemToRealWorldCoordinateMapper(1);
            const worldItem: Partial<GwmWorldItem> = {
                dimensions: new Rectangle(3, 3, 2, 2),
                additionalData: {
                    dock: Direction.NORTH_WEST
                }
            };

            const translate = worldItemToRealWorldCoordinateMapper.getTranslate(<GwmWorldItem> worldItem, null);
            expect(translate).to.eql(new Vector2Model(3, 3));
        });

        it ('translates the mesh correctly when docking to NORTH_EAST', () => {
            const worldItemToRealWorldCoordinateMapper = new WorldItemToRealWorldCoordinateMapper(1);
            const worldItem: Partial<GwmWorldItem> = {
                dimensions: new Rectangle(3, 3, 2, 2),
                additionalData: {
                    dock: Direction.NORTH_EAST
                }
            };

            const translate = worldItemToRealWorldCoordinateMapper.getTranslate(<GwmWorldItem> worldItem, null);
            expect(translate).to.eql(new Vector2Model(5, 3));
        });

        it ('translates the mesh correctly when docking to SOUTH_WEST', () => {
            const worldItemToRealWorldCoordinateMapper = new WorldItemToRealWorldCoordinateMapper(1);
            const worldItem: Partial<GwmWorldItem> = {
                dimensions: new Rectangle(3, 3, 2, 2),
                additionalData: {
                    dock: Direction.SOUTH_WEST
                }
            };

            const translate = worldItemToRealWorldCoordinateMapper.getTranslate(<GwmWorldItem> worldItem, null);
            expect(translate).to.eql(new Vector2Model(3, 5));
        });

        it ('translates the mesh correctly when docking to SOUTH_EAST', () => {
            const worldItemToRealWorldCoordinateMapper = new WorldItemToRealWorldCoordinateMapper(1);
            const worldItem: Partial<GwmWorldItem> = {
                dimensions: new Rectangle(3, 3, 2, 2),
                additionalData: {
                    dock: Direction.SOUTH_EAST
                }
            };

            const translate = worldItemToRealWorldCoordinateMapper.getTranslate(<GwmWorldItem> worldItem, null);
            expect(translate).to.eql(new Vector2Model(5, 5));
        });
    });
});
