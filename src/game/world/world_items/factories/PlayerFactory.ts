import { Mesh, Scene, Skeleton, Space } from '@babylonjs/core';
import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { Player } from '../item_types/Player';
import { Rectangle } from '@nightshifts.inc/geometry';
import { GwmItemImporter } from '../../world_factory/GwmItemImporter';
import { World } from '../../World';
import { WorldItem } from '../item_types/WorldItem';
import { WorldItemToWorldCenterTranslatorDecorator } from '../world_item_mappers/WorldItemToWorldCenterTranslatorDecorator';
import { WorldItemToRealWorldCoordinateMapper } from '../world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { VectorModel, toVector3 } from '../../../model/core/VectorModel';

export class PlayerFactory implements GwmItemImporter {
    public meshInfo: [Mesh[], Skeleton[]];
    private scene: Scene;

    constructor(meshInfo: [Mesh[], Skeleton[]], scene: Scene) {
        this.meshInfo = meshInfo;
        this.scene = scene;
    }


    public createItem(worldItem: GwmWorldItem, world: World): WorldItem {
        const gameObjectTranslator = new WorldItemToWorldCenterTranslatorDecorator(world, new WorldItemToRealWorldCoordinateMapper());

        const meshes = this.meshInfo[0]; //.map(mesh => mesh.clone('player'));
        meshes.forEach(mesh => mesh.isVisible = true);

        let boundingBox = gameObjectTranslator.getTranslate(worldItem.dimensions);
        const translate = new VectorModel(boundingBox.left, 0, -boundingBox.top);
        translate.addZ(-2);

        boundingBox = new Rectangle(translate.x, translate.z, 1, 1);
        const player = new Player(meshes[0], this.meshInfo[1][0], this.scene, boundingBox);

        player.mesh.translate(toVector3(translate), 1, Space.WORLD);

        return player;
    }
}
