import { GwmItemDeserializer } from './GwmItemDeserializer';
import { GameObject } from 'game-worldmap-generator';
import { ShadowGenerator } from 'babylonjs';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { GameObjectTranslator } from '../game_object_mappers/GameObjectToRealWorldCoordinateMapper';
import { MeshModel } from '../../../../model/core/MeshModel';
import { VectorModel } from '../../../../model/core/VectorModel';
import { World } from '../../../../model/World';

export class GwmFloorDeserializer implements GwmItemDeserializer {
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


    public createItem(gameObject: GameObject, world: World): MeshModel {
        const mesh = this.meshModelTemplate.createMeshes()[0];
        const translate2 = this.gameObjectTranslator.getTranslate(gameObject, world);
        const translate = new VectorModel(translate2.x(), 0, -translate2.y());
        translate.addZ(-2);

        const meshModel = new MeshModel(mesh, 'floor');
        meshModel.translate(translate);

        return meshModel;
    }
}
