import { Mesh, Scene, Skeleton, Space } from '@babylonjs/core';
import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { toVector3, VectorModel } from '../../../model/core/VectorModel';
import { World } from '../../World';
import { GwmItemImporter } from '../../world_factory/GwmItemImporter';
import { WorldItem } from '../WorldItem';
import { WorldItemTranslator, WorldItemToRealWorldCoordinateMapper } from '../world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { Player } from './Player';
import { Rectangle } from '@nightshifts.inc/geometry';
import { WorldItemToWorldCenterTranslatorDecorator } from '../world_item_mappers/WorldItemToWorldCenterTranslatorDecorator';

export class PlayerFactory implements GwmItemImporter {
    private meshInfo: [Mesh[], Skeleton[]];
    private scene: Scene;

    constructor(meshInfo: [Mesh[], Skeleton[]], scene: Scene) {
        this.meshInfo = meshInfo;
        this.scene = scene;
    }


    public createItem(worldItem: GwmWorldItem, world: World): WorldItem {
        const gameObjectTranslator = new WorldItemToWorldCenterTranslatorDecorator(world, new WorldItemToRealWorldCoordinateMapper());

        this.meshInfo[0].forEach(mesh => mesh.isVisible = true);

        let boundingBox = gameObjectTranslator.getTranslate(worldItem.dimensions);
        const translate = new VectorModel(boundingBox.left, 0, -boundingBox.top);
        translate.addZ(-2);

        boundingBox = new Rectangle(translate.x, translate.z, 1, 1);
        const player = new Player(this.meshInfo[0][0], this.meshInfo[1][0], this.scene, boundingBox);

        player.mesh.translate(toVector3(translate), 1, Space.WORLD);

        return player;
    }
}
