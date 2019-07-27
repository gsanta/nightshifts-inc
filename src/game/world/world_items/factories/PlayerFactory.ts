import { Axis, Mesh, Quaternion, Scene, Skeleton } from '@babylonjs/core';
import { Point, Polygon } from '@nightshifts.inc/geometry';
import { VectorModel } from '../../../model/core/VectorModel';
import { GameObject } from '../item_types/GameObject';

export class PlayerFactory {
    public meshInfo: [Mesh[], Skeleton[]];
    private scene: Scene;

    constructor(meshInfo: [Mesh[], Skeleton[]], scene: Scene) {
        this.meshInfo = meshInfo;
        this.scene = scene;
    }


    public createItem(meshes: Mesh[], boundingBox: Polygon, rotation: number): GameObject {
        meshes = this.meshInfo[0]; //.map(mesh => mesh.clone('player'));
        meshes.forEach(mesh => mesh.isVisible = true);

        boundingBox = boundingBox.negate('y');
        boundingBox = boundingBox.translate(new Point(- boundingBox.getBoundingInfo().extent[0] / 2, boundingBox.getBoundingInfo().extent[1] / 2));

        const player = new GameObject(meshes[0], boundingBox, {type: 'player', skeleton: this.meshInfo[1][0]});
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
