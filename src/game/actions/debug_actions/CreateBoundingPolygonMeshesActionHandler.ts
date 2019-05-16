import { ActionHandler } from '../ActionHandler';
import { GameActionType } from '../GameActionType';
import { World } from '../../world/World';
import { Rectangle } from '@nightshifts.inc/geometry';
import { MeshBuilder, StandardMaterial, Color3, Vector3, Space, Mesh } from '@babylonjs/core';
import _ from 'lodash';
import { Room } from '../../world/world_items/item_types/Room';
import { SimpleWorldItem } from '../../world/world_items/item_types/SimpleWorldItem';
import { WorldItem } from '../../world/world_items/item_types/WorldItem';
import { ActionDispatcher } from '../ActionDispatcher';
import { OpenInventoryCommand } from '../../world/world_items/action_strategies/OpenInventoryCommand';


export class CreateBoundingPolygonMeshesActionHandler implements ActionHandler {
    private actionDispatcher: ActionDispatcher;

    constructor(actionDispatcher: ActionDispatcher) {
        this.actionDispatcher = actionDispatcher;
    }

    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.GAME_IS_READY:
                world.getWorldItemsByName('cupboard')
                    .forEach(item => {

                        item.setBoundingMesh(this.createMesh(item, world));

                        if ((<Room> item.parent).label === 'room-1') {
                            item.setDefaultAction(new OpenInventoryCommand(this.actionDispatcher));
                        } else {
                            item.hasDefaultAction = false;
                        }
                    });

                world.getWorldItemsByName('door')
                    .forEach(item => {
                        item.setBoundingMesh(this.createMesh(item, world));
                    });

                world.getWorldItemsByName('bed')
                    .forEach(item => {
                        item.setBoundingMesh(this.createMesh(item, world));
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

                cupboard.boundingMesh = this.createMesh(cupboard, world);
                // cupboard.boundingBox = this.createMesh(<Rectangle> new Rectangle(0, 0, 1, 1), world);
                break;
            default:
                break;
        }
    }

    private createMesh(worldItem: WorldItem, world: World): Mesh {
        const boundingPolygon = worldItem.getBoundingBox();

        const box = MeshBuilder.CreateBox(
            `bounding-box`,
            {  width: boundingPolygon.width, depth: boundingPolygon.height, height: worldItem.getHeight()  },
            world.scene
        );

        const center = boundingPolygon.getBoundingCenter();
        box.translate(new Vector3(center.x, 0, center.y), 1, Space.WORLD);

        const material = new StandardMaterial('box-material', world.scene);
        material.diffuseColor = Color3.FromHexString('#00FF00');
        material.alpha = 0.5;
        material.wireframe = false;
        box.material = material;
        box.isVisible = false;

        return box;
    }
}
