import { ActionHandler } from '../ActionHandler';
import { GameActionType } from '../GameActionType';
import { World } from '../../world/World';
import { MeshBuilder, StandardMaterial, Color3, Vector3, Space, Mesh } from '@babylonjs/core';
import _ from 'lodash';
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

                        // item.setBoundingMesh(this.createMesh(item, world));

                        if (item.parent.label === 'room-1') {
                            item.setDefaultAction(new OpenInventoryCommand(this.actionDispatcher));
                        } else {
                            item.hasDefaultAction = false;
                        }
                    });

                // world.getWorldItemsByName('door')
                //     .forEach(item => {
                //         item.setBoundingMesh(this.createMesh(item, world));
                //     });

                // world.getWorldItemsByName('bed')
                //     .forEach(item => {
                //         item.setBoundingMesh(this.createMesh(item, world));
                //     });

                // world.getWorldItemsByName('window')
                // .forEach(item => {
                //     item.boundingBox = this.createMesh(<Rectangle> (<any> item).boundingPolygon, world);
                // });
                break;

            case GameActionType.DISPLAY_BOUNDING_BOXES:
                world.config.displayBoundingBoxes = true;
                world.worldItems.forEach(item => {
                    if (item.getBoundingMesh()) {
                        item.getBoundingMesh().isVisible = true;
                    }
                });
                break;

            case GameActionType.HIDE_BOUNDING_BOXES:
                    world.config.displayBoundingBoxes = false;
                    world.worldItems.forEach(item => {
                        if (item.getBoundingMesh()) {
                            item.getBoundingMesh().isVisible = false;
                        }
                    });
                    break;
            default:
                break;
        }
    }

    private createMesh(worldItem: WorldItem, world: World): Mesh {
        const boundingPolygon = worldItem.getBoundingBox();

        const box = MeshBuilder.CreateBox(
            `bounding-box`,
            {  width: boundingPolygon.getBoundingInfo().extent[0], depth: boundingPolygon.getBoundingInfo().extent[1], height: worldItem.getHeight()  },
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
