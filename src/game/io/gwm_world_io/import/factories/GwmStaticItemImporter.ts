import { GwmItemImporter } from './GwmItemImporter';
import { GameObject } from 'game-worldmap-generator';
import { ShadowGenerator, Mesh } from 'babylonjs';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { GameObjectTranslator } from '../game_object_mappers/GameObjectToRealWorldCoordinateMapper';
import { MeshModel } from '../../../../model/core/MeshModel';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';
import { AdditionalData } from '../AdditionalData';
import { Vector2Model } from '../../../../model/utils/Vector2Model';
import { Orientation } from '../../../../model/utils/Orientation';
import { World } from '../../../../model/World';


export class GwmStaticItemImporter implements GwmItemImporter {
    private meshModelTemplate: MeshModel;
    private gameObjectTranslator: GameObjectTranslator;
    private shadowGenerator: ShadowGenerator;

    constructor(
        meshModelTemplate: MeshModel,
        gameObjectTranslator: GameObjectTranslator,
        shadowGenerator: ShadowGenerator
    ) {
        this.meshModelTemplate = meshModelTemplate;
        this.gameObjectTranslator = gameObjectTranslator;
        this.shadowGenerator = shadowGenerator;
    }

    public createItem(gameObject: GameObject, world: World): MeshModel {
        const meshModel = this.meshModelTemplate.clone();

        const realMeshDimensions = this.getRealMeshDimensions(meshModel.mesh, gameObject);
        const translate2 = this.gameObjectTranslator.getTranslate(gameObject, world, realMeshDimensions);
        const translate = new VectorModel(translate2.x(), 0, -translate2.y());
        const rotation = this.gameObjectTranslator.getRotation(gameObject);

        meshModel.mesh.rotation.y = rotation;

        meshModel.mesh.translate(toVector3(translate), 1, BABYLON.Space.WORLD);

        this.shadowGenerator.getShadowMap().renderList.push(meshModel.mesh);

        return meshModel;
    }

    private getRealMeshDimensions(mesh: Mesh, gameObject: GameObject<AdditionalData>): Vector2Model {
        const xExtend = mesh.getBoundingInfo().boundingBox.extendSize.x * mesh.scaling.x;
        const zExtend = mesh.getBoundingInfo().boundingBox.extendSize.y * mesh.scaling.y;

        switch (gameObject.additionalData.orientation) {
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
