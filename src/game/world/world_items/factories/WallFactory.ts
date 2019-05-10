import { Scene } from '@babylonjs/core';
import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { ContainerWorldItem } from '../item_types/ContainerWorldItem';
import { Wall } from '../item_types/Wall';
import { World } from '../../World';
import { WorldItem } from '../item_types/WorldItem';
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
