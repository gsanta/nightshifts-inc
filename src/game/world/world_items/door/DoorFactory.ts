import { GwmWorldItem } from 'game-worldmap-generator';
import { GwmItemImporter } from '../../world_factory/GwmItemImporter';
import { Scene } from 'babylonjs';
import { AdditionalData } from '../../world_import/AdditionalData';
import { World } from '../../World';
import { WorldItem } from '../WorldItem';
import { Door } from './Door';

export class DoorFactory implements GwmItemImporter {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public createItem(worldItem: GwmWorldItem<AdditionalData>, world: World): WorldItem {
        const door = Door.fromGwmWorldItem(worldItem, this.scene, world);

        return door;
    }
}
