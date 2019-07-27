import { WorldItemFactory } from '../../world_factory/WorldItemFactory';
import { WorldItemInfo } from '@nightshifts.inc/world-generator';
import { World } from '../../World';
import { GameObject } from '../item_types/GameObject';
import { Scene, StandardMaterial, Mesh, Skeleton, Color3 } from '@babylonjs/core';
import { VectorModel } from '../../../model/core/VectorModel';
import { Polygon } from '@nightshifts.inc/geometry';

export class EnemyFactory implements WorldItemFactory {
    private scene: Scene;

    public meshInfo: [Mesh[], Skeleton[]];

    constructor(meshInfo: [Mesh[], Skeleton[]]) {
        this.meshInfo = meshInfo;
    }

    public create(polygon: Polygon, world: World): GameObject {
        const meshes = this.meshInfo[0].map(mesh => mesh.clone());
        meshes[0].isVisible = true;

        const enemy = new GameObject(meshes[0], polygon, {type: 'enemy'});
        enemy.setPosition(new VectorModel(polygon.getBoundingRectangle().getBoundingInfo().min[0], 0, polygon.getBoundingRectangle().getBoundingInfo().max[1]));
        enemy.mesh.material = this.createMaterial();
        return enemy;
    }

    public createItem(worldItem: WorldItemInfo, world: World): GameObject {
        throw new Error('This method is deprecated so not implementing it');
    }

    private createMaterial() {
        const material = new StandardMaterial('enemy-visible-material', this.scene);
        material.emissiveColor = new Color3(0, 0, 1);

        return material;
    }
}
