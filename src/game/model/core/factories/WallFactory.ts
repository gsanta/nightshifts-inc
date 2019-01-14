import { ItemFactory } from './ItemFactory';
import { GameObject } from 'game-worldmap-generator';
import { MeshModel } from '../MeshModel';
import { MeshBuilder, StandardMaterial, ShadowGenerator } from 'babylonjs';
import { MeshTemplate } from '../templates/MeshTemplate';
import { GameObjectTranslator } from '../../../game_map_creator/GameObjectToRealWorldCoordinateWrapper';
import { VectorModel } from '../VectorModel';

export class WallFactory implements ItemFactory {
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
        const scaling = this.gameObjectTranslator.getDimensions(gameObject).toVector3(5);
        const translate2 = this.gameObjectTranslator.getTranslate(gameObject);
        const translate = new VectorModel(translate2.x(), scaling.y() / 2, -translate2.y());

        const mesh = this.meshModelTemplate.createMeshes()[0];
        const meshModel = new MeshModel(mesh);
    
        meshModel.translate(translate);
        mesh.scaling.x = scaling.x();
        mesh.scaling.y = scaling.y();
        mesh.scaling.z = scaling.z();

        this.shadowGenerator.getShadowMap().renderList.push(mesh)

        return meshModel;
    }
}