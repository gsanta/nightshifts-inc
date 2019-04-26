import { GwmItemImporter } from './GwmItemImporter';
import { WorldItemTranslator } from './world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { ShadowGenerator, Mesh } from 'babylonjs';
import { GwmWorldItem } from 'game-worldmap-generator';
import { World } from '../../../../model/World';
import { WorldItem } from '../../../../world_items/WorldItem';
import { SimpleWorldItem } from '../../../../world_items/SimpleWorldItem';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';
import { AdditionalData } from '../AdditionalData';
import { Vector2Model } from '../../../../model/utils/Vector2Model';
import { Orientation } from '../../../../model/utils/Orientation';
import { WorldItemFactory } from '../../../../model/core/factories/WorldItemFactory';

export class ModelFactory implements WorldItemFactory {
    private mesh: Mesh;
    private gameObjectTranslator: WorldItemTranslator;
    private shadowGenerator: ShadowGenerator;

    constructor(
        mesh: Mesh,
        gameObjectTranslator: WorldItemTranslator,
        shadowGenerator: ShadowGenerator
    ) {
        this.mesh = mesh;
        this.gameObjectTranslator = gameObjectTranslator;
        this.shadowGenerator = shadowGenerator;
    }

    public createItem(worldItem: GwmWorldItem, world: World): WorldItem {
        const mesh =  this.mesh.clone(`${this.mesh.name}`);
        mesh.isVisible = true;
        const meshModel = new SimpleWorldItem(mesh, worldItem.name);

        const realMeshDimensions = this.getRealMeshDimensions(mesh, worldItem);
        const translate2 = this.gameObjectTranslator.getTranslate(worldItem, world, realMeshDimensions);
        const translate = new VectorModel(translate2.x(), 0, -translate2.y());
        const rotation = this.gameObjectTranslator.getRotation(worldItem);

        mesh.rotation.y = rotation;

        mesh.translate(toVector3(translate), 1, BABYLON.Space.WORLD);

        this.shadowGenerator.getShadowMap().renderList.push(mesh);


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
