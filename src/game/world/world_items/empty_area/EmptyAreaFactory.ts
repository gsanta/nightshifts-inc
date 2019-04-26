import { WorldItemFactory } from '../../world_factory/WorldItemFactory';
import { GwmWorldItem } from 'game-worldmap-generator';
import { World } from '../../World';
import { WorldItem } from '../WorldItem';
import { Point } from 'game-worldmap-generator/build/model/Point';
import { Vector3, Scene, StandardMaterial } from 'babylonjs';
import { SimpleWorldItem } from '../SimpleWorldItem';
import { GameConstants } from '../../../GameConstants';
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

        const mesh = BABYLON.MeshBuilder.CreatePolygon(
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

        return new SimpleWorldItem(mesh, 'empty');
    }

    private createMaterial(scene: Scene): StandardMaterial {
        const material = new BABYLON.StandardMaterial('doorMaterial', scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(colors.door);

        return material;
    }
}
