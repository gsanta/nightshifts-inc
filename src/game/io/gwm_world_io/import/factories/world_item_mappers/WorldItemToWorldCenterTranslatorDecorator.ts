import { GwmWorldItem } from 'game-worldmap-generator';
import { WorldItemTranslator } from './WorldItemToRealWorldCoordinateMapper';
import { Vector2Model } from '../../../../../model/utils/Vector2Model';
import { World } from '../../../../../model/World';


export class WorldItemToWorldCenterTranslatorDecorator implements WorldItemTranslator {
    private gameObjectToMeshSizeRatio: number;
    private gameObjectToRealWorldCoordinateMapper: WorldItemTranslator;

    constructor(gameObjectToMeshSizeRatio: number, gameObjectToRealWorldCoordinateWrapper: WorldItemTranslator) {
        this.gameObjectToMeshSizeRatio = gameObjectToMeshSizeRatio;
        this.gameObjectToRealWorldCoordinateMapper = gameObjectToRealWorldCoordinateWrapper;
    }

    public getTranslate(worldItem: GwmWorldItem, world: World, realMeshDimensions: Vector2Model): Vector2Model {
        const vector2 = this.gameObjectToRealWorldCoordinateMapper.getTranslate(worldItem, world, realMeshDimensions);

        const translateX = - (world.dimensions.x() / 2);
        const translateY = - (world.dimensions.y() / 2);
        return vector2.add(new Vector2Model(translateX, translateY));
    }

    public getDimensions(worldItem: GwmWorldItem): Vector2Model {
        return this.gameObjectToRealWorldCoordinateMapper.getDimensions(worldItem);
    }

    public getRotation(worldItem: GwmWorldItem) {
        return this.gameObjectToRealWorldCoordinateMapper.getRotation(worldItem);
    }
}
