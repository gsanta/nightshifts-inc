import { GwmItemImporter } from './GwmItemImporter';
import { GwmWorldItem } from 'game-worldmap-generator';
import { ShadowGenerator, Scene } from 'babylonjs';
import { WorldItemTranslator } from './world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { AdditionalData } from '../AdditionalData';
import { WorldItem } from '../../../../world_items/WorldItem';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';
import { Door } from '../../../../model/creature/type/Door';
import { World } from '../../../../model/World';

export class GwmDoorImporter implements GwmItemImporter {
    private shadowGenerator: ShadowGenerator;
    private scene: Scene;

    constructor(scene: Scene, shadowGenerator: ShadowGenerator) {
        this.scene = scene;
        this.shadowGenerator = shadowGenerator;
    }


    public createItem(worldItem: GwmWorldItem<AdditionalData>, world: World): WorldItem {
        const door = Door.fromGwmWorldItem(worldItem, this.scene, world);

        this.shadowGenerator.getShadowMap().renderList.push(door.containerMesh);

        return door;
    }
}
