import { Axis, Mesh, Quaternion, Scene, Skeleton, Space, Vector3 } from '@babylonjs/core';
import { Polygon } from '@nightshifts.inc/geometry';
import { SimpleWorldItem } from '../item_types/SimpleWorldItem';
import { WorldItem } from '../item_types/WorldItem';

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

        boundingBox = boundingBox.mirrorY();
        boundingBox = boundingBox.addX(- boundingBox.xExtent() / 2);
        boundingBox = boundingBox.addY(boundingBox.yExtent() / 2);

        // let boundingBox = gameObjectTranslator.getTranslate(worldItem.dimensions);
        // const translate = new VectorModel(boundingBox.minX(), 0, -boundingBox.maxX());
        // translate.addZ(-2);

        // boundingBox = Polygon.createRectangle(translate.x, translate.z, 1, 1);
        // const player = new Player(meshes[0], this.meshInfo[1][0], this.scene, worldItem.dimensions);
        const player = new SimpleWorldItem(meshes[0], boundingBox, {type: 'player', skeleton: this.meshInfo[1][0]});
        player.health = 100;



        // const impostor = new PhysicsImpostor(player.mesh, PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, this.scene);
        // player.setImpostor(impostor);

        const quaternion = Quaternion.RotationAxis(Axis.Y, 0);
        player.mesh.rotationQuaternion = quaternion;
        player.mesh.checkCollisions = true;
        // player.mesh.translate(toVector3(translate), 1, Space.WORLD);

        const center = boundingBox.getBoundingCenter();
        player.mesh.translate(new Vector3(center.x, player.getHeight() / 2, center.y), 1, Space.WORLD);

        return player;
    }
}
