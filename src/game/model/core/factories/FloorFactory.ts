import { ItemFactory } from './ItemFactory';
import { GameObject } from 'game-worldmap-generator';
import { MeshModel } from '../MeshModel';
import { ShadowGenerator } from 'babylonjs';
import { MeshTemplate } from '../templates/MeshTemplate';
import { GameObjectTranslator } from '../../../io/game_map_creator/GameObjectToRealWorldCoordinateWrapper';
import { VectorModel } from '../VectorModel';

export class FloorFactory implements ItemFactory {
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
        const translate2 = this.gameObjectTranslator.getTranslate(gameObject);
        const translate = new VectorModel(translate2.x(), 0, -translate2.y());
        translate.addZ(-2);

        const meshModel = new MeshModel(mesh);
        meshModel.translate(translate);

        return meshModel;
    }
}
