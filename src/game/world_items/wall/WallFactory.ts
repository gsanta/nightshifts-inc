import { Scene, ShadowGenerator } from 'babylonjs';
import { GwmWorldItem } from 'game-worldmap-generator';
import { ContainerWorldItem } from '../ContainerWorldItem';
import { Wall } from './Wall';
import { World } from '../../model/World';
import { WorldItem } from '../WorldItem';
import { GwmItemImporter } from '../../io/gwm_world_io/import/factories/GwmItemImporter';

export class WallFactory implements GwmItemImporter {
    private shadowGenerator: ShadowGenerator;
    private scene: Scene;

    constructor(shadowGenerator: ShadowGenerator, scene: Scene) {
        this.shadowGenerator = shadowGenerator;
        this.scene = scene;
    }

    public createItem(worldItem: GwmWorldItem, world: World): WorldItem {
        const wall = <ContainerWorldItem> Wall.fromGwmWorldItem(worldItem, this.scene, world);

        this.shadowGenerator.getShadowMap().renderList.push(wall.children[0].mesh);
        this.shadowGenerator.getShadowMap().renderList.push(wall.children[1].mesh);

        return wall;
    }
}
