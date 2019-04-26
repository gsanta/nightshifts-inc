import { GwmWorldItem } from 'game-worldmap-generator';
import { GwmItemImporter } from '../../world_factory/GwmItemImporter';
import { ShadowGenerator, Scene } from 'babylonjs';
import { AdditionalData } from '../../world_import/AdditionalData';
import { World } from '../../World';
import { WorldItem } from '../WorldItem';
import { Door } from './Door';

export class DoorFactory implements GwmItemImporter {
    private shadowGenerator: ShadowGenerator;
    private scene: Scene;

    constructor(scene: Scene, shadowGenerator: ShadowGenerator) {
        this.scene = scene;
        this.shadowGenerator = shadowGenerator;
    }


    public createItem(worldItem: GwmWorldItem<AdditionalData>, world: World): WorldItem {
        const door = Door.fromGwmWorldItem(worldItem, this.scene, world);

        this.shadowGenerator.getShadowMap().renderList.push(door.children[0].mesh);
        this.shadowGenerator.getShadowMap().renderList.push(door.children[1].mesh);


        return door;
    }
}
