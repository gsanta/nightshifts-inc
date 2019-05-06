import { WorldItemFactory } from '../../world_factory/WorldItemFactory';
import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { World } from '../../World';
import { WorldItem } from '../WorldItem';
import { Scene, StandardMaterial, Mesh, Skeleton, MeshBuilder, Color3 } from '@babylonjs/core';
import { Enemy } from './Enemy';
import { VectorModel } from '../../../model/core/VectorModel';
import { Polygon, Rectangle } from '@nightshifts.inc/geometry';


export class EnemyFactory implements WorldItemFactory {
    private scene: Scene;

    private meshInfo: [Mesh[], Skeleton[]];

    constructor(meshInfo: [Mesh[], Skeleton[]]) {
        this.meshInfo = meshInfo;
    }

    // constructor(scene: Scene) {
    //     this.scene = scene;
    // }

    public create(polygon: Polygon, world: World): WorldItem {
        const material = this.createMaterial();
        const meshes = this.meshInfo[0].map(mesh => mesh.clone());
        meshes[0].isVisible = true;

        const enemy = new Enemy(meshes[0], this.scene, <Rectangle> polygon);
        enemy.setPosition(new VectorModel(polygon.left, 0, polygon.top));
        return enemy;
    }

    public createItem(worldItem: GwmWorldItem, world: World): WorldItem {
        throw new Error('This method is deprecated so not implementing it');
    }

    private createMesh(boundingBox: Polygon) {
        return MeshBuilder.CreateSphere(
            'enemy',
            { diameter: 2 },
            this.scene
        );
    }

    private createMaterial(): StandardMaterial {
        const material = new StandardMaterial('enemy-material', this.scene);
        material.diffuseColor = Color3.FromHexString('FF0000');

        return material;
    }
}
