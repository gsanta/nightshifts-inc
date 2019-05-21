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
import { BoundingBoxCreator } from '../world_items/factories/BoundingBoxCreator';

export class ModelFactory implements WorldItemFactory {
    private boundingBoxCreator: BoundingBoxCreator;

    constructor(boundingBoxCreator: BoundingBoxCreator) {
        this.boundingBoxCreator = boundingBoxCreator;
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
        // meshModel.setBoudingBox(boundingBox);


        return meshModel;
    }
}
