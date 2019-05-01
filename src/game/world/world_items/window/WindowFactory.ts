import { Scene, ShadowGenerator } from 'babylonjs';
import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { VectorModel } from '../../../model/core/VectorModel';
import { Window } from './Window';
import { World } from '../../World';
import { WorldItem } from '../WorldItem';
import { AdditionalData } from '../../world_import/AdditionalData';
import { GwmItemImporter } from '../../world_factory/GwmItemImporter';

export class WindowFactory implements GwmItemImporter {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public createItem(worldItem: GwmWorldItem<AdditionalData>, world: World): WorldItem {
        const window = Window.fromGwmWorldItem(worldItem, this.scene, world);

        window.setPivots(new VectorModel(1, 0, 0), new VectorModel(-1, 0, 0), worldItem.additionalData.angle);

        // window.children[0].children[0];

        // this.shadowGenerator.getShadowMap().renderList.push(wall.children[0].mesh);
        // this.shadowGenerator.getShadowMap().renderList.push(wall.children[1].mesh);

        return window;
    }
}
