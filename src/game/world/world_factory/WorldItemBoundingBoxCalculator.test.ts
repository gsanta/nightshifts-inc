import { Rectangle, Polygon } from '@nightshifts.inc/geometry';
import { expect } from 'chai';
import { WorldItemBoundingBoxCalculator } from './WorldItemBoundingBoxCalculator';
import { Mesh, BoundingInfo } from '@babylonjs/core';
import { World } from '../World';
import { Vector2Model } from '../../model/utils/Vector2Model';
import { WorldItemToRealWorldCoordinateMapper } from '../world_items/world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { Direction } from '../../model/utils/Direction';
import { WorldItemInfo } from '@nightshifts.inc/world-generator';
declare const describe, it;


const createMeshMock = (): Partial<Mesh> => {
    return {
        getBoundingInfo: () =>  {
            return <BoundingInfo><unknown> {
                boundingBox: {
                    extendSize: {
                        x: 0,
                        y: 0
                    }
                }
            };
        },
        scaling: <any> {
            x: 0,
            y: 0
        }
    };
};

const createWorldMock = (): Partial<World> => {
    return {
        dimensions: <Vector2Model> {
            x: () => 0,
            y: () => 0
        }
    };
};

const createGwmWorldItemMock = (boudingBox: Polygon, dock: Direction): Partial<WorldItemInfo> => {
    return {
        dimensions: boudingBox,
        additionalData: {
            dock: dock
        }
    };
};

describe('WorldItemToRealWorldCoordinateMapper', () => {
    describe('`getBoundingBox`', () => {
        it ('translates the mesh correctly when docking to MIDDLE', () => {
            const worldItemToRealWorldCoordinateMapper = new WorldItemBoundingBoxCalculator();

            const world = createWorldMock();
            const gwmWorldItem = createGwmWorldItemMock(new Rectangle(3, 3, 2, 2), undefined);
            const mesh = createMeshMock();

            const translate = worldItemToRealWorldCoordinateMapper.getBoundingBox(<World> world, <WorldItemInfo> gwmWorldItem, <Mesh> mesh);
            expect(translate).to.eql(new Rectangle(4, 4, 2, 2));
        });

        it ('translates the mesh correctly when docking to NORTH_WEST', () => {
            const worldItemBoundingBoxCalculator = new WorldItemBoundingBoxCalculator();

            const world = createWorldMock();
            const gwmWorldItem = createGwmWorldItemMock(new Rectangle(3, 3, 2, 2),  Direction.NORTH_WEST);
            const mesh = createMeshMock();

            const translate = worldItemBoundingBoxCalculator.getBoundingBox(<World> world, <WorldItemInfo> gwmWorldItem, <Mesh> mesh);

            expect(translate).to.eql(new Rectangle(3, 3, 2, 2));
        });

        it ('translates the mesh correctly when docking to NORTH_EAST', () => {
            const worldItemBoundingBoxCalculator = new WorldItemBoundingBoxCalculator();

            const world = createWorldMock();
            const gwmWorldItem = createGwmWorldItemMock(new Rectangle(3, 3, 2, 2),  Direction.NORTH_EAST);
            const mesh = createMeshMock();

            const translate = worldItemBoundingBoxCalculator.getBoundingBox(<World> world, <WorldItemInfo> gwmWorldItem, <Mesh> mesh);
            expect(translate).to.eql(new Rectangle(5, 3, 2, 2));
        });

        it ('translates the mesh correctly when docking to SOUTH_WEST', () => {
            const worldItemBoundingBoxCalculator = new WorldItemBoundingBoxCalculator();

            const world = createWorldMock();
            const gwmWorldItem = createGwmWorldItemMock(new Rectangle(3, 3, 2, 2),  Direction.SOUTH_WEST);
            const mesh = createMeshMock();

            const translate = worldItemBoundingBoxCalculator.getBoundingBox(<World> world, <WorldItemInfo> gwmWorldItem, <Mesh> mesh);
            expect(translate).to.eql(new Rectangle(3, 5, 2, 2));
        });

        it ('translates the mesh correctly when docking to SOUTH_EAST', () => {
            const worldItemBoundingBoxCalculator = new WorldItemBoundingBoxCalculator();

            const world = createWorldMock();
            const gwmWorldItem = createGwmWorldItemMock(new Rectangle(3, 3, 2, 2),  Direction.SOUTH_EAST);
            const mesh = createMeshMock();

            const translate = worldItemBoundingBoxCalculator.getBoundingBox(<World> world, <WorldItemInfo> gwmWorldItem, <Mesh> mesh);
            expect(translate).to.eql(new Rectangle(5, 5, 2, 2));
        });
    });
});
