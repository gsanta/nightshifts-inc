import { ActionHandler } from '../ActionHandler';
import { GameActionType } from '../GameActionType';
import { World } from '../../world/World';
import { Rectangle } from '@nightshifts.inc/geometry';
import { MeshBuilder, StandardMaterial, Color3, Vector3, Space, Mesh } from '@babylonjs/core';
import _ from 'lodash';
import { Room } from '../../world/world_items/item_types/Room';
import { SimpleWorldItem } from '../../world/world_items/item_types/SimpleWorldItem';


export class CreateBoundingPolygonMeshesActionHandler implements ActionHandler {

    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.GAME_IS_READY:
                world.getWorldItemsByName('cupboard')
                    .forEach(item => {
                        item.boundingBox = this.createMesh(<Rectangle> (<any> item).boundingPolygon, world);
                    });

                world.getWorldItemsByName('door')
                    .forEach(item => {
                        item.boundingBox = this.createMesh(<Rectangle> (<any> item).boundingPolygon, world);
                    });

                // world.getWorldItemsByName('window')
                // .forEach(item => {
                //     item.boundingBox = this.createMesh(<Rectangle> (<any> item).boundingPolygon, world);
                // });
                break;
            case GameActionType.CREATE_BOUNDING_POLYGON_MESHES:
                // world.player.boundingBox = this.createMesh(<Rectangle> (<any> world.player).boundingPolygon, world);

                const room: Room = <Room> _.find(world.getWorldItemsByName('room'), (r: Room) => r.label === 'room-1');
                const cupboard: SimpleWorldItem = <SimpleWorldItem> _.find(room.children, child => child.type === 'cupboard');

                cupboard.boundingBox = this.createMesh(<Rectangle> (<any> cupboard).boundingPolygon, world);
                // cupboard.boundingBox = this.createMesh(<Rectangle> new Rectangle(0, 0, 1, 1), world);
                break;
            default:
                break;
        }
    }

    private createMesh(rectangle: Rectangle, world: World): Mesh {

        const box = MeshBuilder.CreateBox(
            `bounding-box`,
            {  width: rectangle.width, depth: rectangle.height, height: 12  },
            world.scene
        );

        const center = rectangle.getBoundingCenter();
        box.translate(new Vector3(center.x, 0, center.y), 1, Space.WORLD);

        const material = new StandardMaterial('box-material', world.scene);
        material.diffuseColor = Color3.FromHexString('00FF00');
        material.wireframe = true;
        box.material = material;
        box.isVisible = false;

        return box;
    }
}
