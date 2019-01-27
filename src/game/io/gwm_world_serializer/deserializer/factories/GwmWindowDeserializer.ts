


import { GwmItemFactory } from './GwmItemFactory';
import { GameObject} from 'game-worldmap-generator';
import { ShadowGenerator } from 'babylonjs';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { GameObjectTranslator } from '../game_object_mappers/GameObjectToRealWorldCoordinateMapper';
import { AdditionalData } from '../AdditionalData';
import { MeshModel } from '../../../../model/core/MeshModel';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';
import { Window } from '../../../../model/creature/type/Window';

export class GwmWindowDeserializer implements GwmItemFactory {
    private meshModelTemplate: MeshTemplate;
    private gameObjectTranslator: GameObjectTranslator;
    private shadowGenerator: ShadowGenerator;
    private gameObjectToMeshSizeRatio: number;

    constructor(
        meshModelTemplate: MeshTemplate,
        gameObjectTranslator: GameObjectTranslator,
        shadowGenerator: ShadowGenerator,
        gameObjectToMeshSizeRatio: number
    ) {
        this.meshModelTemplate = meshModelTemplate;
        this.gameObjectTranslator = gameObjectTranslator;
        this.shadowGenerator = shadowGenerator;
        this.gameObjectToMeshSizeRatio = gameObjectToMeshSizeRatio;
    }


    public createItem(gameObject: GameObject<AdditionalData>): MeshModel {
        const scaling = this.gameObjectTranslator.getDimensions(gameObject).toVector3(5);
        const translate2 = this.gameObjectTranslator.getTranslate(gameObject);
        const translate = new VectorModel(translate2.x(), scaling.y() / 2, -translate2.y());

        const meshes = this.meshModelTemplate.createMeshes();

        meshes[0].translate(toVector3(translate), 1);

        this.shadowGenerator.getShadowMap().renderList.push(...meshes);

        const window = new Window(meshes);

        window.setPivots(new VectorModel(1, 0, 0), new VectorModel(-1, 0, 0), gameObject.additionalData.angle);

        return window;
    }
}
