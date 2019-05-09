import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { WorldItemTranslator } from './WorldItemToRealWorldCoordinateMapper';
import { Vector2Model } from '../../../model/utils/Vector2Model';
import { World } from '../../World';
import { Polygon, Point } from '@nightshifts.inc/geometry';
import { Direction } from '../../../model/utils/Direction';


export class WorldItemToWorldCenterTranslatorDecorator implements WorldItemTranslator {
    private gameObjectToRealWorldCoordinateMapper: WorldItemTranslator;
    private world: World;

    constructor(world: World, gameObjectToRealWorldCoordinateWrapper: WorldItemTranslator) {
        this.gameObjectToRealWorldCoordinateMapper = gameObjectToRealWorldCoordinateWrapper;
        this.world = world;
    }

    public getTranslate(polygon: Polygon, dock?: Direction, realMeshDimensions?: Vector2Model): Polygon {
        polygon = this.gameObjectToRealWorldCoordinateMapper.getTranslate(polygon, dock, realMeshDimensions);

        const translateX = - (this.world.dimensions.x() / 2);
        const translateY = - (this.world.dimensions.y() / 2);

        return polygon.translate(new Point(translateX, translateY));
    }

    public getDimensions(worldItem: GwmWorldItem): Vector2Model {
        return this.gameObjectToRealWorldCoordinateMapper.getDimensions(worldItem);
    }

    public getRotation(worldItem: GwmWorldItem) {
        return this.gameObjectToRealWorldCoordinateMapper.getRotation(worldItem);
    }
}
