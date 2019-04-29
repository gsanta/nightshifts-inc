import { Scene } from 'babylonjs';
import { GwmWorldItem } from 'game-worldmap-generator';
import { ContainerWorldItem } from '../ContainerWorldItem';
import { Wall } from './Wall';
import { World } from '../../World';
import { WorldItem } from '../WorldItem';
import { GwmItemImporter } from '../../world_factory/GwmItemImporter';

export class WallFactory implements GwmItemImporter {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public createItem(worldItem: GwmWorldItem, world: World): WorldItem {
        const wall = <ContainerWorldItem> Wall.fromGwmWorldItem(worldItem, this.scene, world);

        return wall;
    }
}
