import { Scene } from 'babylonjs';
import { GwmWorldItem } from 'game-worldmap-generator';
import { VectorModel } from '../../../../model/core/VectorModel';
import { Window } from '../../../../model/world_items/Window';
import { World } from '../../../../model/World';
import { WorldItem } from '../../../../world_items/WorldItem';
import { AdditionalData } from '../AdditionalData';
import { GwmItemImporter } from './GwmItemImporter';

export class GwmWindowImporter implements GwmItemImporter {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public createItem(worldItem: GwmWorldItem<AdditionalData>, world: World): WorldItem {
        const window = Window.fromGwmWorldItem(worldItem, this.scene, world);

        window.setPivots(new VectorModel(1, 0, 0), new VectorModel(-1, 0, 0), worldItem.additionalData.angle);

        return window;
    }
}
