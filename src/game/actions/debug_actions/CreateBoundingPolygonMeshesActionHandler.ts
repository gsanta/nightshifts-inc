import { ActionHandler } from '../ActionHandler';
import { GameActionType } from '../GameActionType';
import { World } from '../../world/World';
import { Polygon, Rectangle } from '@nightshifts.inc/geometry';
import { MeshBuilder, StandardMaterial, Color3, Vector3, Space, Mesh } from '@babylonjs/core';


export class CreateBoundingPolygonMeshesActionHandler implements ActionHandler {

    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.CREATE_BOUNDING_POLYGON_MESHES:
                world.player.boundingBox = this.createMesh(<Rectangle> (<any> world.player).boundingPolygon, world);
                break;
            default:
                break;
        }
    }

    private createMesh(rectangle: Rectangle, world: World): Mesh {

        const box = MeshBuilder.CreateBox(
            `bounding-box`,
            {  width: rectangle.width, depth: rectangle.height, height: 1  },
            world.scene
        );

        box.translate(new Vector3(rectangle.left, 0, rectangle.top), 3, Space.WORLD);

        const material = new StandardMaterial('box-material', world.scene);
        material.diffuseColor = Color3.FromHexString('00FF00');
        material.wireframe = true;
        box.material = material;

        return box;
    }
}
