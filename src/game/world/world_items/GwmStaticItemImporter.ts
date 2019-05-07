import { GwmItemImporter } from '../world_factory/GwmItemImporter';
import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { ShadowGenerator, Mesh, Space } from '@babylonjs/core';
import { MeshTemplate } from '../../model/core/templates/MeshTemplate';
import { WorldItemTranslator } from './world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { WorldItem } from './WorldItem';
import { VectorModel, toVector3 } from '../../model/core/VectorModel';
import { AdditionalData } from '../world_import/AdditionalData';
import { Vector2Model } from '../../model/utils/Vector2Model';
import { Orientation } from '../../model/utils/Orientation';
import { World } from '../World';
import { SimpleWorldItem } from './SimpleWorldItem';

/**
 * @deprecated use `GwmModelImporter`
 */
export class GwmStaticItemImporter implements GwmItemImporter {
    private meshModelTemplate: MeshTemplate;
    private gameObjectTranslator: WorldItemTranslator;
    private shadowGenerator: ShadowGenerator;

    constructor(
        meshModelTemplate: MeshTemplate,
        gameObjectTranslator: WorldItemTranslator,
        shadowGenerator: ShadowGenerator
    ) {
        this.meshModelTemplate = meshModelTemplate;
        this.gameObjectTranslator = gameObjectTranslator;
        this.shadowGenerator = shadowGenerator;
    }

    public createItem(worldItem: GwmWorldItem, world: World): WorldItem {
        const meshes = this.meshModelTemplate.createMeshes();
        const meshModel = new SimpleWorldItem(meshes[0], worldItem.name, worldItem.dimensions);

        meshes.forEach(mesh => {
            const realMeshDimensions = this.getRealMeshDimensions(mesh, worldItem);
            const translate2 = this.gameObjectTranslator.getTranslate(worldItem, world, realMeshDimensions);
            const translate = new VectorModel(translate2.x(), 0, -translate2.y());
            const rotation = this.gameObjectTranslator.getRotation(worldItem);

            mesh.rotation.y = rotation;

            mesh.translate(toVector3(translate), 1, Space.WORLD);

            this.shadowGenerator.getShadowMap().renderList.push(mesh);
        });


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
