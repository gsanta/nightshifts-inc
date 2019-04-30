import { WorldItemFactory } from '../../world_factory/WorldItemFactory';
import { GwmWorldItem, Polygon } from 'game-worldmap-generator';
import { World } from '../../World';
import { WorldItem } from '../WorldItem';
import { Scene, StandardMaterial, Mesh, Skeleton } from 'babylonjs';
import { Enemy } from './Enemy';
import { VectorModel } from '../../../model/core/VectorModel';


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
        this.meshInfo[0].forEach(mesh => mesh.isVisible = true);

        // const mesh =  this.meshInfo[0][0].clone(`${this.meshInfo[0][0].name}`);

        // const mesh = this.createMesh(polygon);
        // mesh.material = this.createMaterial();
        const enemy = new Enemy(this.meshInfo[0][0], this.scene);
        enemy.translate(new VectorModel(polygon.left, 0, polygon.top));
        return enemy;
    }

    public createItem(worldItem: GwmWorldItem, world: World): WorldItem {
        throw new Error('This method is deprecated so not implementing it');
    }

    private createMesh(boundingBox: Polygon) {
        return BABYLON.MeshBuilder.CreateSphere(
            'enemy',
            { diameter: 2 },
            this.scene
        );
    }

    private createMaterial(): StandardMaterial {
        const material = new BABYLON.StandardMaterial('enemy-material', this.scene);
        material.diffuseColor = BABYLON.Color3.FromHexString('FF0000');

        return material;
    }
}
