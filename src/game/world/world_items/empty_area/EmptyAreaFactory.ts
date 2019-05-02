import { WorldItemFactory } from '../../world_factory/WorldItemFactory';
import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { World } from '../../World';
import { WorldItem } from '../WorldItem';
import { Vector3, Scene, StandardMaterial, Color3 } from 'babylonjs';
import { GameConstants } from '../../../GameConstants';
import { EmptyArea } from './EmptyArea';
import { Point } from '@nightshifts.inc/geometry';
import { MeshBuilder } from 'babylonjs';
const colors = GameConstants.colors;

export class EmptyAreaFactory implements WorldItemFactory {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public createItem(worldItem: GwmWorldItem, world: World): WorldItem {
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

        return new EmptyArea(mesh, dimensions);
    }

    private createMaterial(scene: Scene): StandardMaterial {
        const material = new StandardMaterial('empty-area-material', scene);
        material.diffuseColor = Color3.FromHexString(colors.door);

        return material;
    }
}
