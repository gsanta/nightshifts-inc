import { Axis, Mesh, Quaternion, Scene, Skeleton, Space, Vector3 } from '@babylonjs/core';
import { Polygon, Point } from '@nightshifts.inc/geometry';
import { SimpleWorldItem } from '../item_types/SimpleWorldItem';
import { WorldItem } from '../item_types/WorldItem';
import { VectorModel } from '../../../model/core/VectorModel';

export class PlayerFactory {
    public meshInfo: [Mesh[], Skeleton[]];
    private scene: Scene;

    constructor(meshInfo: [Mesh[], Skeleton[]], scene: Scene) {
        this.meshInfo = meshInfo;
        this.scene = scene;
    }


    public createItem(meshes: Mesh[], boundingBox: Polygon, rotation: number): WorldItem {
        meshes = this.meshInfo[0]; //.map(mesh => mesh.clone('player'));
        meshes.forEach(mesh => mesh.isVisible = true);

        boundingBox = boundingBox.negate('y');
        boundingBox = boundingBox.translate(new Point(- boundingBox.getBoundingInfo().extent[0] / 2, boundingBox.getBoundingInfo().extent[1] / 2));

        const player = new SimpleWorldItem(meshes[0], boundingBox, {type: 'player', skeleton: this.meshInfo[1][0]});
        player.health = 100;

        // const impostor = new PhysicsImpostor(player.mesh, PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, this.scene);
        // player.setImpostor(impostor);

        const quaternion = Quaternion.RotationAxis(Axis.Y, 0);
        player.mesh.rotationQuaternion = quaternion;
        player.mesh.checkCollisions = true;

        const center = boundingBox.getBoundingCenter();
        player.setPosition(new VectorModel(center.x, player.getHeight() / 2 + 1, center.y));

        return player;
    }
}
