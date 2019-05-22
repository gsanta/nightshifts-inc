import { WorldItemFactory } from '../../world_factory/WorldItemFactory';
import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { World } from '../../World';
import { WorldItem } from '../item_types/WorldItem';
import { Scene, StandardMaterial, Mesh, Skeleton, Color3 } from '@babylonjs/core';
import { VectorModel } from '../../../model/core/VectorModel';
import { Polygon, Rectangle } from '@nightshifts.inc/geometry';
import { SimpleWorldItem } from '../item_types/SimpleWorldItem';


export class EnemyFactory implements WorldItemFactory {
    private scene: Scene;

    public meshInfo: [Mesh[], Skeleton[]];

    constructor(meshInfo: [Mesh[], Skeleton[]]) {
        this.meshInfo = meshInfo;
    }

    // constructor(scene: Scene) {
    //     this.scene = scene;
    // }

    public create(polygon: Polygon, world: World): WorldItem {
        const meshes = this.meshInfo[0].map(mesh => mesh.clone());
        meshes[0].isVisible = true;

        const enemy = new SimpleWorldItem(meshes[0], <Rectangle> polygon, {type: 'enemy'});
        enemy.setPosition(new VectorModel(polygon.left, 0, polygon.top));
        enemy.mesh.material = this.createMaterial();
        return enemy;
    }

    public createItem(worldItem: GwmWorldItem, world: World): WorldItem {
        throw new Error('This method is deprecated so not implementing it');
    }

    private createMaterial() {
        const material = new StandardMaterial('enemy-visible-material', this.scene);
        material.emissiveColor = new Color3(0, 0, 1);

        return material;
    }
}