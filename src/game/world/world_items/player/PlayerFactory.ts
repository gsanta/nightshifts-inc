import { Mesh, Scene, Skeleton, Space } from '@babylonjs/core';
import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { toVector3, VectorModel } from '../../../model/core/VectorModel';
import { World } from '../../World';
import { GwmItemImporter } from '../../world_factory/GwmItemImporter';
import { WorldItem } from '../WorldItem';
import { WorldItemTranslator } from '../world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { Player } from './Player';

export class PlayerFactory implements GwmItemImporter {
    private meshInfo: [Mesh[], Skeleton[]];
    private gameObjectTranslator: WorldItemTranslator;
    private scene: Scene;

    constructor(meshInfo: [Mesh[], Skeleton[]], gameObjectTranslator: WorldItemTranslator, scene: Scene) {
        this.meshInfo = meshInfo;
        this.gameObjectTranslator = gameObjectTranslator;
        this.scene = scene;
    }


    public createItem(worldItem: GwmWorldItem, world: World): WorldItem {
        // const meshes = this.meshInfo[0].map(mesh => mesh.clone(`${this.meshInfo[0][0].name}`));
        this.meshInfo[0].forEach(mesh => mesh.isVisible = true);
        // const mesh = this.meshInfo[0][0].clone(`${this.meshInfo[0][0].name}`);

        const translate2 = this.gameObjectTranslator.getTranslate(worldItem, world);
        const translate = new VectorModel(translate2.x(), 0, -translate2.y());
        translate.addZ(-2);

        const player = new Player(this.meshInfo[0][0], this.meshInfo[1][0], this.scene);

        player.mesh.translate(toVector3(translate), 1, Space.WORLD);

        return player;
    }
}
