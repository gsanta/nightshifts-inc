import { WorldItem } from '../WorldItem';
import { World } from '../../World';
import { Scene, MeshBuilder, Vector3, StandardMaterial, DynamicTexture } from '@babylonjs/core';
import { Polygon } from '@nightshifts.inc/geometry';
import { SimpleWorldItem } from '../SimpleWorldItem';


export class RoomLabelFactory {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public createItem(polygon: Polygon, world: World): WorldItem {
        const mesh = this.createMesh(polygon);
        return new SimpleWorldItem(mesh, 'room-label');
    }

    private createMesh(dimensions: Polygon) {
        const roomTop = MeshBuilder.CreatePolygon(
            'room-top',
            {
                shape: dimensions.points.map(point => new Vector3(point.x, 0, point.y)),
                depth: 2,
                updatable: true
            },
            this.scene
        );

        roomTop.translate(new Vector3(0, 5, 0), 1);

        roomTop.material = this.createMaterial();

        return roomTop;
    }

    private createMaterial(): StandardMaterial {
        const textureGround = new DynamicTexture('room-label-texture', {width: 512, height: 256}, this.scene, false);

        const material = new StandardMaterial('door-closed-material', this.scene);
        material.diffuseTexture = textureGround;
        material.alpha = 0.5;

        const font = 'bold 60px Arial';
        textureGround.drawText('Box', 200, 150, font, 'green', 'white', true, true);

        return material;
    }
}