import { WorldItemTranslator, WorldItemToRealWorldCoordinateMapper } from '../world_items/world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { Mesh, Skeleton, Space } from '@babylonjs/core';
import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { World } from '../World';
import { WorldItem } from '../world_items/WorldItem';
import { SimpleWorldItem } from '../world_items/SimpleWorldItem';
import { VectorModel, toVector3 } from '../../model/core/VectorModel';
import { AdditionalData } from '../world_import/AdditionalData';
import { Vector2Model } from '../../model/utils/Vector2Model';
import { Orientation } from '../../model/utils/Orientation';
import { WorldItemFactory } from './WorldItemFactory';
import { Direction } from '../../model/utils/Direction';
import { WorldItemToWorldCenterTranslatorDecorator } from '../world_items/world_item_mappers/WorldItemToWorldCenterTranslatorDecorator';

export class ModelFactory implements WorldItemFactory {
    private meshInfo: [Mesh[], Skeleton[]];

    constructor(meshInfo: [Mesh[], Skeleton[]]) {
        this.meshInfo = meshInfo;
    }

    public createItem(worldItem: GwmWorldItem, world: World): WorldItem {
        const gameObjectTranslator = new WorldItemToWorldCenterTranslatorDecorator(world, new WorldItemToRealWorldCoordinateMapper(1));
        const mesh =  this.meshInfo[0][0].clone(`${this.meshInfo[0][0].name}`);
        mesh.isVisible = true;

        const realMeshDimensions = this.getRealMeshDimensions(mesh, worldItem);
        const dock = worldItem.additionalData.dock ? worldItem.additionalData.dock : Direction.MIDDLE;
        const boundingBox = gameObjectTranslator.getTranslate(worldItem.dimensions, dock, realMeshDimensions);
        const translate = new VectorModel(boundingBox.left, 0, -boundingBox.top);
        const rotation = gameObjectTranslator.getRotation(worldItem);

        mesh.rotation.y = rotation;

        mesh.translate(toVector3(translate), 1, Space.WORLD);
        const meshModel = new SimpleWorldItem(mesh, worldItem.name, worldItem.dimensions);

        return meshModel;
    }

    private getRealMeshDimensions(mesh: Mesh, worldItem: GwmWorldItem<AdditionalData>): Vector2Model {
        const xExtend = mesh.getBoundingInfo().boundingBox.extendSize.x * mesh.scaling.x;
        const zExtend = mesh.getBoundingInfo().boundingBox.extendSize.y * mesh.scaling.y;

        switch (worldItem.additionalData.orientation) {
            case Orientation.NORTH:
            case Orientation.SOUTH:
            default:
                return new Vector2Model(xExtend, zExtend);
            case Orientation.WEST:
            case Orientation.EAST:
                return new Vector2Model(zExtend, xExtend);
        }
    }
}
