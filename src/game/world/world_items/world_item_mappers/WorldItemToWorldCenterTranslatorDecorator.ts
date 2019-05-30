import { WorldItemInfo } from '@nightshifts.inc/world-generator';
import { WorldItemTranslator } from './WorldItemToRealWorldCoordinateMapper';
import { Vector2Model } from '../../../model/utils/Vector2Model';
import { World } from '../../World';
import { Polygon, Point, Shape } from '@nightshifts.inc/geometry';
import { Direction } from '../../../model/utils/Direction';


export class WorldItemToWorldCenterTranslatorDecorator implements WorldItemTranslator {
    private gameObjectToRealWorldCoordinateMapper: WorldItemTranslator;
    private world: World;

    constructor(world: World, gameObjectToRealWorldCoordinateWrapper: WorldItemTranslator) {
        this.gameObjectToRealWorldCoordinateMapper = gameObjectToRealWorldCoordinateWrapper;
        this.world = world;
    }

    public getTranslate(polygon: Shape, dock?: Direction, realMeshDimensions?: Vector2Model): Shape {
        polygon = this.gameObjectToRealWorldCoordinateMapper.getTranslate(polygon, dock, realMeshDimensions);

        const translateX = - (this.world.dimensions.x() / 2);
        const translateY = - (this.world.dimensions.y() / 2);

        return polygon.translate(new Point(translateX, translateY));
    }

    public getRotation(worldItem: WorldItemInfo) {
        return this.gameObjectToRealWorldCoordinateMapper.getRotation(worldItem);
    }
}
