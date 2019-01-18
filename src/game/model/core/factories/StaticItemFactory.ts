import { ItemFactory } from './ItemFactory';
import { GameObject } from 'game-worldmap-generator';
import { MeshModel } from '../MeshModel';
import { MeshTemplate } from '../templates/MeshTemplate';
import { GameObjectTranslator } from '../../../game_map_creator/GameObjectToRealWorldCoordinateWrapper';
import { ShadowGenerator, Mesh } from 'babylonjs';
import { VectorModel, toVector3 } from '../VectorModel';
import { AdditionalData } from '../../../game_map_creator/AdditionalData';
import { Orientation } from '../../utils/Orientation';
import { Vector2Model } from '../../utils/Vector2Model';


export class StaticItemFactory implements ItemFactory {
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
        const mesh = this.meshModelTemplate.createMeshes()[0];

        const scaling = this.gameObjectTranslator.getDimensions(gameObject).toVector3(5);
        const realMeshDimensions = this.getRealMeshDimensions(mesh, gameObject);
        const translate2 = this.gameObjectTranslator.getTranslate(gameObject, realMeshDimensions);
        const translate = new VectorModel(translate2.x(), 0, -translate2.y());
        const rotation = this.gameObjectTranslator.getRotation(gameObject);

        mesh.rotation.y = rotation;
        const meshModel = new MeshModel(mesh);

        meshModel.mesh.translate(toVector3(translate), 1, BABYLON.Space.WORLD);

        this.shadowGenerator.getShadowMap().renderList.push(mesh);

        return meshModel;
    }

    private getRealMeshDimensions(mesh: Mesh, gameObject: GameObject<AdditionalData>): Vector2Model {
        switch (gameObject.additionalData.orientation) {
            case Orientation.NORTH:
            case Orientation.SOUTH:
            default:
                return null;
            case Orientation.WEST:
            case Orientation.EAST:
                const xExtend = mesh.getBoundingInfo().boundingBox.extendSize.x * mesh.scaling.x;
                const zExtend = mesh.getBoundingInfo().boundingBox.extendSize.y * mesh.scaling.y;

                return new Vector2Model(zExtend, xExtend);
        }
    }
}