import { Scene, ShadowGenerator } from 'babylonjs';
import { GwmWorldItem } from 'game-worldmap-generator';
import { VectorModel } from '../../model/core/VectorModel';
import { Window } from './Window';
import { World } from '../../model/World';
import { WorldItem } from '../WorldItem';
import { AdditionalData } from '../../io/gwm_world_io/import/AdditionalData';
import { GwmItemImporter } from '../../io/gwm_world_io/import/factories/GwmItemImporter';

export class WindowFactory implements GwmItemImporter {
    private scene: Scene;
    private shadowGenerator: ShadowGenerator;

    constructor(scene: Scene, shadowGenerator: ShadowGenerator) {
        this.scene = scene;
        this.shadowGenerator = shadowGenerator;
    }

    public createItem(worldItem: GwmWorldItem<AdditionalData>, world: World): WorldItem {
        const window = Window.fromGwmWorldItem(worldItem, this.scene, world);

        window.setPivots(new VectorModel(1, 0, 0), new VectorModel(-1, 0, 0), worldItem.additionalData.angle);

        window.sides[0].children.forEach((child) => {
            this.shadowGenerator.getShadowMap().renderList.push(child.mesh);
        });

        window.sides[1].children.forEach((child) => {
            this.shadowGenerator.getShadowMap().renderList.push(child.mesh);
        });
        // window.children[0].children[0];

        // this.shadowGenerator.getShadowMap().renderList.push(wall.children[0].mesh);
        // this.shadowGenerator.getShadowMap().renderList.push(wall.children[1].mesh);

        return window;
    }
}
