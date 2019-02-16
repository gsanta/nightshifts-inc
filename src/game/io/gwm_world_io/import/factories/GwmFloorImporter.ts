import { GwmItemImporter } from './GwmItemImporter';
import { GameObject } from 'game-worldmap-generator';
import { ShadowGenerator } from 'babylonjs';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { GameObjectTranslator } from '../game_object_mappers/GameObjectToRealWorldCoordinateMapper';
import { MeshModel } from '../../../../model/core/MeshModel';
import { VectorModel } from '../../../../model/core/VectorModel';
import { World } from '../../../../model/World';

export class GwmFloorImporter implements GwmItemImporter {
    private floorTemplate: MeshModel;
    private gameObjectTranslator: GameObjectTranslator;
    private shadowGenerator: ShadowGenerator;

    constructor(
        meshModel: MeshModel,
        gameObjectTranslator: GameObjectTranslator,
        shadowGenerator: ShadowGenerator
    ) {
        this.floorTemplate = meshModel;
        this.gameObjectTranslator = gameObjectTranslator;
        this.shadowGenerator = shadowGenerator;
    }


    public createItem(gameObject: GameObject, world: World): MeshModel {
        const floor = this.floorTemplate.clone();
        const translate2 = this.gameObjectTranslator.getTranslate(gameObject, world);
        const translate = new VectorModel(translate2.x(), 0, -translate2.y());
        translate.addZ(-2);

        floor.translate(translate);

        return floor;
    }
}
