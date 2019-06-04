import { Mesh, Scene, Skeleton, Space, PhysicsImpostor, Quaternion, Axis } from '@babylonjs/core';
import { WorldItemInfo } from '@nightshifts.inc/world-generator';
import { GwmItemImporter } from '../../world_factory/GwmItemImporter';
import { World } from '../../World';
import { WorldItem } from '../item_types/WorldItem';
import { WorldItemToWorldCenterTranslatorDecorator } from '../world_item_mappers/WorldItemToWorldCenterTranslatorDecorator';
import { WorldItemToRealWorldCoordinateMapper } from '../world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { VectorModel, toVector3 } from '../../../model/core/VectorModel';
import { SimpleWorldItem } from '../item_types/SimpleWorldItem';
import { Polygon } from '@nightshifts.inc/geometry';

export class PlayerFactory implements GwmItemImporter {
    public meshInfo: [Mesh[], Skeleton[]];
    private scene: Scene;

    constructor(meshInfo: [Mesh[], Skeleton[]], scene: Scene) {
        this.meshInfo = meshInfo;
        this.scene = scene;
    }


    public createItem(worldItem: WorldItemInfo, world: World): WorldItem {
        const gameObjectTranslator = new WorldItemToWorldCenterTranslatorDecorator(world, new WorldItemToRealWorldCoordinateMapper());

        const meshes = this.meshInfo[0]; //.map(mesh => mesh.clone('player'));
        meshes.forEach(mesh => mesh.isVisible = true);

        let boundingBox = gameObjectTranslator.getTranslate(worldItem.dimensions);
        const translate = new VectorModel(boundingBox.minX(), 0, -boundingBox.maxX());
        translate.addZ(-2);

        boundingBox = Polygon.createRectangle(translate.x, translate.z, 1, 1);
        // const player = new Player(meshes[0], this.meshInfo[1][0], this.scene, worldItem.dimensions);
        const player = new SimpleWorldItem(meshes[0], boundingBox, {type: 'player', skeleton: this.meshInfo[1][0]});
        player.health = 100;

        // const impostor = new PhysicsImpostor(player.mesh, PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, this.scene);
        // player.setImpostor(impostor);

        const quaternion = Quaternion.RotationAxis(Axis.Y, 0);
        player.mesh.rotationQuaternion = quaternion;
        player.mesh.checkCollisions = true;
        player.mesh.translate(toVector3(translate), 1, Space.WORLD);

        return player;
    }
}
