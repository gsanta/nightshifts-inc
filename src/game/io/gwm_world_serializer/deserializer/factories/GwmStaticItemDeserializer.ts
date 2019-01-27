import { GwmItemFactory } from './GwmItemFactory';
import { GameObject } from 'game-worldmap-generator';
import { ShadowGenerator, Mesh } from 'babylonjs';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { GameObjectTranslator } from '../game_object_mappers/GameObjectToRealWorldCoordinateMapper';
import { MeshModel } from '../../../../model/core/MeshModel';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';
import { AdditionalData } from '../AdditionalData';
import { Vector2Model } from '../../../../model/utils/Vector2Model';
import { Orientation } from '../../../../model/utils/Orientation';


export class GwmStaticItemDeserializer implements GwmItemFactory {
    private meshModelTemplate: MeshTemplate;
    private gameObjectTranslator: GameObjectTranslator;
    private shadowGenerator: ShadowGenerator;

    constructor(
        meshModelTemplate: MeshTemplate,
        gameObjectTranslator: GameObjectTranslator,
        shadowGenerator: ShadowGenerator
    ) {
        this.meshModelTemplate = meshModelTemplate;
        this.gameObjectTranslator = gameObjectTranslator;
        this.shadowGenerator = shadowGenerator;
    }

    public createItem(gameObject: GameObject): MeshModel {
        const meshes = this.meshModelTemplate.createMeshes();
        const meshModel = new MeshModel(meshes[0]);

        meshes.forEach(mesh => {
            const realMeshDimensions = this.getRealMeshDimensions(mesh, gameObject);
            const translate2 = this.gameObjectTranslator.getTranslate(gameObject, realMeshDimensions);
            const translate = new VectorModel(translate2.x(), 0, -translate2.y());
            const rotation = this.gameObjectTranslator.getRotation(gameObject);

            mesh.rotation.y = rotation;

            mesh.translate(toVector3(translate), 1, BABYLON.Space.WORLD);

            this.shadowGenerator.getShadowMap().renderList.push(mesh);
        });


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
