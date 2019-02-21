import { GwmItemImporter } from './GwmItemImporter';
import { WorldItem } from 'game-worldmap-generator';
import { ShadowGenerator, Mesh } from 'babylonjs';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { WorldItemTranslator } from './world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { MeshModel } from '../../../../model/core/MeshModel';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';
import { AdditionalData } from '../AdditionalData';
import { Vector2Model } from '../../../../model/utils/Vector2Model';
import { Orientation } from '../../../../model/utils/Orientation';
import { World } from '../../../../model/World';


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

    public createItem(worldItem: WorldItem, world: World): MeshModel {
        const meshes = this.meshModelTemplate.createMeshes();
        const meshModel = new MeshModel(meshes[0], worldItem.name);

        meshes.forEach(mesh => {
            const realMeshDimensions = this.getRealMeshDimensions(mesh, worldItem);
            const translate2 = this.gameObjectTranslator.getTranslate(worldItem, world, realMeshDimensions);
            const translate = new VectorModel(translate2.x(), 0, -translate2.y());
            const rotation = this.gameObjectTranslator.getRotation(worldItem);

            mesh.rotation.y = rotation;

            mesh.translate(toVector3(translate), 1, BABYLON.Space.WORLD);

            this.shadowGenerator.getShadowMap().renderList.push(mesh);
        });


        return meshModel;
    }

    private getRealMeshDimensions(mesh: Mesh, worldItem: WorldItem<AdditionalData>): Vector2Model {
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
