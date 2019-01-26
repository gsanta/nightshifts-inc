


import { ItemFactory } from './ItemFactory';
import { GameObject} from 'game-worldmap-generator';
import { MeshModel } from '../MeshModel';
import { ShadowGenerator } from 'babylonjs';
import { MeshTemplate } from '../templates/MeshTemplate';
import { GameObjectTranslator } from '../../../io/game_map_creator/GameObjectToRealWorldCoordinateWrapper';
import { VectorModel, toVector3 } from '../VectorModel';
import { AdditionalData } from '../../../io/game_map_creator/AdditionalData';
import { Window } from '../../creature/type/Window';

export class WindowFactory implements ItemFactory {
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
