import { Rectangle } from '@nightshifts.inc/geometry';
import { expect } from 'chai';
import { Direction } from '../../../model/utils/Direction';
import { WorldItemToRealWorldCoordinateMapper } from './WorldItemToRealWorldCoordinateMapper';
declare const describe, it;


describe('WorldItemToRealWorldCoordinateMapper', () => {
    describe('getTranslate', () => {
        it ('translates the mesh correctly when docking to MIDDLE', () => {
            const worldItemToRealWorldCoordinateMapper = new WorldItemToRealWorldCoordinateMapper();

            const boundingBox = new Rectangle(3, 3, 2, 2);

            const translate = worldItemToRealWorldCoordinateMapper.getTranslate(boundingBox);
            expect(translate).to.eql(new Rectangle(4, 4, 2, 2));
        });

        it ('translates the mesh correctly when docking to NORTH_WEST', () => {
            const worldItemToRealWorldCoordinateMapper = new WorldItemToRealWorldCoordinateMapper();
            const boundingBox =  new Rectangle(3, 3, 2, 2);

            const translate = worldItemToRealWorldCoordinateMapper.getTranslate(boundingBox, Direction.NORTH_WEST);
            expect(translate).to.eql(new Rectangle(3, 3, 2, 2));
        });

        it ('translates the mesh correctly when docking to NORTH_EAST', () => {
            const worldItemToRealWorldCoordinateMapper = new WorldItemToRealWorldCoordinateMapper();
            const boundingBox =  new Rectangle(3, 3, 2, 2);

            const translate = worldItemToRealWorldCoordinateMapper.getTranslate(boundingBox, Direction.NORTH_EAST);
            expect(translate).to.eql(new Rectangle(5, 3, 2, 2));
        });

        it ('translates the mesh correctly when docking to SOUTH_WEST', () => {
            const worldItemToRealWorldCoordinateMapper = new WorldItemToRealWorldCoordinateMapper();
            const boundingBox = new Rectangle(3, 3, 2, 2);

            const translate = worldItemToRealWorldCoordinateMapper.getTranslate(boundingBox, Direction.SOUTH_WEST);
            expect(translate).to.eql(new Rectangle(3, 5, 2, 2));
        });

        it ('translates the mesh correctly when docking to SOUTH_EAST', () => {
            const worldItemToRealWorldCoordinateMapper = new WorldItemToRealWorldCoordinateMapper();
            const boundingBox = new Rectangle(3, 3, 2, 2);

            const translate = worldItemToRealWorldCoordinateMapper.getTranslate(boundingBox, Direction.SOUTH_EAST);
            expect(translate).to.eql(new Rectangle(5, 5, 2, 2));
        });
    });
});
