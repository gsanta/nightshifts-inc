import { ActionHandler } from '../ActionHandler';
import { GameActionType } from '../GameActionType';
import { World } from '../../world/World';
import { Polygon, Rectangle } from '@nightshifts.inc/geometry';
import { MeshBuilder } from '@babylonjs/core';


export class CreateBoundingPolygonMeshesActionHandler implements ActionHandler {

    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.CREATE_BOUNDING_POLYGON_MESHES:

                break;
            default:
                break;
        }
    }

    private createMesh(rectangle: Rectangle, world: World) {

        const parentMesh = MeshBuilder.CreateBox(
            `bounding-polygon`,
            {  width: rectangle.width, depth: rectangle.height, height: 1  },
            world.scene
        );

    }
}
