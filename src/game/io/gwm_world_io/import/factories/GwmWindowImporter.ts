


import { GwmItemImporter } from './GwmItemImporter';
import { GwmWorldItem} from 'game-worldmap-generator';
import { ShadowGenerator, Scene } from 'babylonjs';
import { WorldItemTranslator } from './world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { AdditionalData } from '../AdditionalData';
import { WorldItem } from '../../../../world_items/WorldItem';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';
import { Window } from '../../../../model/creature/type/Window';
import { World } from '../../../../model/World';

export class GwmWindowImporter implements GwmItemImporter {
    private windowTemplate: Window;
    private gameObjectTranslator: WorldItemTranslator;
    private shadowGenerator: ShadowGenerator;
    private gameObjectToMeshSizeRatio: number;
    private scene: Scene;

    constructor(
        windowTemplate: Window,
        gameObjectTranslator: WorldItemTranslator,
        shadowGenerator: ShadowGenerator,
        gameObjectToMeshSizeRatio: number,
        scene: Scene
    ) {
        this.windowTemplate = windowTemplate;
        this.gameObjectTranslator = gameObjectTranslator;
        this.shadowGenerator = shadowGenerator;
        this.gameObjectToMeshSizeRatio = gameObjectToMeshSizeRatio;
        this.scene = scene;
    }


    public createItem(worldItem: GwmWorldItem<AdditionalData>, world: World): WorldItem {
        const scaling = this.gameObjectTranslator.getDimensions(worldItem).toVector3(5);
        const translate2 = this.gameObjectTranslator.getTranslate(worldItem, world);
        const translate = new VectorModel(translate2.x(), scaling.y / 2, -translate2.y());

        const window = Window.fromGwmWorldItem(worldItem, this.scene, world);

        // window.containerMesh.wrappedMesh.translate(toVector3(translate), 1);


        // const meshes = window.children.map(child => child.mesh.wrappedMesh);
        // this.shadowGenerator.getShadowMap().renderList.push(...meshes);

        window.setPivots(new VectorModel(1, 0, 0), new VectorModel(-1, 0, 0), worldItem.additionalData.angle);

        return window;
    }
}
