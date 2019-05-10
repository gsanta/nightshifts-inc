import { WorldItemTranslator, WorldItemToRealWorldCoordinateMapper } from '../world_items/world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { Mesh, Skeleton, Space } from '@babylonjs/core';
import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { World } from '../World';
import { WorldItem } from '../world_items/item_types/WorldItem';
import { SimpleWorldItem } from '../world_items/item_types/SimpleWorldItem';
import { VectorModel, toVector3 } from '../../model/core/VectorModel';
import { AdditionalData } from '../world_import/AdditionalData';
import { Vector2Model } from '../../model/utils/Vector2Model';
import { Orientation } from '../../model/utils/Orientation';
import { WorldItemFactory } from './WorldItemFactory';
import { Direction } from '../../model/utils/Direction';
import { WorldItemToWorldCenterTranslatorDecorator } from '../world_items/world_item_mappers/WorldItemToWorldCenterTranslatorDecorator';

export class ModelFactory implements WorldItemFactory {
    public meshInfo: [Mesh[], Skeleton[]];

    constructor(meshInfo: [Mesh[], Skeleton[]]) {
        this.meshInfo = meshInfo;
    }

    public createItem(worldItem: GwmWorldItem, world: World): WorldItem {
        const gameObjectTranslator = new WorldItemToWorldCenterTranslatorDecorator(world, new WorldItemToRealWorldCoordinateMapper());
        const mesh =  this.meshInfo[0][0].clone(`${this.meshInfo[0][0].name}`);
        mesh.isVisible = true;

        const realMeshDimensions = this.getRealMeshDimensions(mesh, worldItem);
        const dock = worldItem.additionalData.dock !== undefined ? worldItem.additionalData.dock : Direction.MIDDLE;
        let boundingBox = gameObjectTranslator.getTranslate(worldItem.dimensions, dock, realMeshDimensions);
        boundingBox = boundingBox.negateY();
        const rotation = gameObjectTranslator.getRotation(worldItem);

        const meshModel = new SimpleWorldItem(mesh, worldItem.name, worldItem.dimensions);
        meshModel.rotateY(rotation);
        meshModel.setBoudingBox(boundingBox);

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
