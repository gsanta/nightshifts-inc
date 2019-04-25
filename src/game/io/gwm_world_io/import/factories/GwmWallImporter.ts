import { Scene, ShadowGenerator } from 'babylonjs';
import { GwmWorldItem } from 'game-worldmap-generator';
import { ContainerWorldItem } from '../../../../world_items/ContainerWorldItem';
import { DefaultWall } from '../../../../world_items/DefaultWall';
import { World } from '../../../../model/World';
import { WorldItem } from '../../../../world_items/WorldItem';
import { GwmItemImporter } from './GwmItemImporter';

export class GwmWallImporter implements GwmItemImporter {
    private shadowGenerator: ShadowGenerator;
    private scene: Scene;

    constructor(shadowGenerator: ShadowGenerator, scene: Scene) {
        this.shadowGenerator = shadowGenerator;
        this.scene = scene;
    }

    public createItem(worldItem: GwmWorldItem, world: World): WorldItem {
        const wall = <ContainerWorldItem> DefaultWall.fromGwmWorldItem(worldItem, this.scene, world);

        this.shadowGenerator.getShadowMap().renderList.push(wall.children[0].mesh);

        return wall;
    }
}
