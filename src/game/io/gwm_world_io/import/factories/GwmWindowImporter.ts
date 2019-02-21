


import { GwmItemImporter } from './GwmItemImporter';
import { WorldItem} from 'game-worldmap-generator';
import { ShadowGenerator } from 'babylonjs';
import { WorldItemTranslator } from './world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { AdditionalData } from '../AdditionalData';
import { MeshModel } from '../../../../model/core/MeshModel';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';
import { Window } from '../../../../model/creature/type/Window';
import { World } from '../../../../model/World';

export class GwmWindowImporter implements GwmItemImporter {
    private windowTemplate: Window;
    private gameObjectTranslator: WorldItemTranslator;
    private shadowGenerator: ShadowGenerator;
    private gameObjectToMeshSizeRatio: number;

    constructor(
        windowTemplate: Window,
        gameObjectTranslator: WorldItemTranslator,
        shadowGenerator: ShadowGenerator,
        gameObjectToMeshSizeRatio: number
    ) {
        this.windowTemplate = windowTemplate;
        this.gameObjectTranslator = gameObjectTranslator;
        this.shadowGenerator = shadowGenerator;
        this.gameObjectToMeshSizeRatio = gameObjectToMeshSizeRatio;
    }


    public createItem(worldItem: WorldItem<AdditionalData>, world: World): MeshModel {
        const scaling = this.gameObjectTranslator.getDimensions(worldItem).toVector3(5);
        const translate2 = this.gameObjectTranslator.getTranslate(worldItem, world);
        const translate = new VectorModel(translate2.x(), scaling.y() / 2, -translate2.y());

        const window = this.windowTemplate.clone();

        window.containerMesh.translate(toVector3(translate), 1);

        this.shadowGenerator.getShadowMap().renderList.push(...window.meshes);


        window.setPivots(new VectorModel(1, 0, 0), new VectorModel(-1, 0, 0), worldItem.additionalData.angle);

        return window;
    }
}
