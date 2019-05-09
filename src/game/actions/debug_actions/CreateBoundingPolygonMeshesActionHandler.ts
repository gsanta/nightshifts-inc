import { ActionHandler } from '../ActionHandler';
import { GameActionType } from '../GameActionType';
import { World } from '../../world/World';
import { Polygon, Rectangle } from '@nightshifts.inc/geometry';
import { MeshBuilder, StandardMaterial, Color3, Vector3, Space } from '@babylonjs/core';


export class CreateBoundingPolygonMeshesActionHandler implements ActionHandler {

    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.CREATE_BOUNDING_POLYGON_MESHES:
                this.createMesh(<Rectangle> (<any> world.player).boundingPolygon, world);
                break;
            default:
                break;
        }
    }

    private createMesh(rectangle: Rectangle, world: World) {

        const box = MeshBuilder.CreateBox(
            `bounding-polygon`,
            {  width: rectangle.width, depth: rectangle.height, height: 1  },
            world.scene
        );

        box.translate(new Vector3(rectangle.left, 0, rectangle.top), 1, Space.WORLD);

        const material = new StandardMaterial('box-material', world.scene);
        material.diffuseColor = Color3.FromHexString('00FF00');
        box.material = material;
    }
}
