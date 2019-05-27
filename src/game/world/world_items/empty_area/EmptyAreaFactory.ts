import { WorldItemFactory } from '../../world_factory/WorldItemFactory';
import { WorldItemInfo } from '@nightshifts.inc/world-generator';
import { World } from '../../World';
import { WorldItem } from '../item_types/WorldItem';
import { Vector3, Scene, StandardMaterial, Color3, Mesh, Skeleton } from '@babylonjs/core';
import { GameConstants } from '../../../GameConstants';
import { Point } from '@nightshifts.inc/geometry';
import { MeshBuilder } from '@babylonjs/core';
import { SimpleWorldItem } from '../item_types/SimpleWorldItem';
const colors = GameConstants.colors;

export class EmptyAreaFactory implements WorldItemFactory {
    private scene: Scene;
    public meshInfo: [Mesh[], Skeleton[]];

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public createItem(worldItem: WorldItemInfo, world: World): WorldItem {
        const translateX = - (world.dimensions.x() / 2);
        const translateY = - (world.dimensions.y() / 2);

        const dimensions  = worldItem.dimensions
            .negateY()
            .translate(new Point(translateX, -translateY));

        const mesh = MeshBuilder.CreatePolygon(
            worldItem.name,
            {
                shape: dimensions.points.map(point => new Vector3(point.x, 2, point.y)),
                depth: 2,
                updatable: true
            },
            this.scene
        );

        mesh.material = this.createMaterial(this.scene);

        mesh.isVisible = false;

        return new SimpleWorldItem(mesh, dimensions, {type: 'empty'});
    }

    private createMaterial(scene: Scene): StandardMaterial {
        const material = new StandardMaterial('empty-area-material', scene);
        material.diffuseColor = Color3.FromHexString(colors.door);

        return material;
    }
}
