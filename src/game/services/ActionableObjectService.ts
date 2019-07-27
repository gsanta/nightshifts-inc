import { World } from '../world/World';
import _ from 'lodash';
import { GameObject } from '../world/world_items/item_types/GameObject';
import { VectorModel } from '../model/core/VectorModel';
import { OpenDoorCommand } from '../world/world_items/action_strategies/OpenDoorCommand';
import { OpenWindowCommand } from '../world/world_items/action_strategies/OpenWindowCommand';
import { OpenInventoryCommand } from '../world/world_items/action_strategies/OpenInventoryCommand';
import { ServiceFacade } from './ServiceFacade';
import { Room } from '../world/world_items/item_types/Room';
import { Border } from '../world/world_items/item_types/Border';


export class ActionableObjectService {
    private world: World;
    private currentActivatableItem: GameObject;
    private services: ServiceFacade;

    constructor(services: ServiceFacade, world: World) {
        this.world = world;
        this.services = services;
    }

    public calcClosestActionableObject() {
        const gameObject = this.getClosestActivatableWorldItem(this.world);
        this.currentActivatableItem = gameObject;

        const prevItem = _.find(this.world.worldItems, item => !item.mesh || item.mesh.isVisible === true);

        if (prevItem && !this.world.config.displayBoundingBoxes && prevItem.mesh) {
            prevItem.mesh.isVisible = false;
        }

        const activeRoom = <Room> _.find(this.world.getWorldItemsByName('room'), room => room.isActive);

        if (activeRoom.children.indexOf(gameObject) !== -1 || activeRoom.borders.indexOf(<Border> gameObject) !== -1) {
            gameObject.mesh.isVisible = true;
        }
    }

    public activateClosestActionableObject() {
        if (this.currentActivatableItem) {

            switch (this.currentActivatableItem.type) {
                case 'door':
                    new OpenDoorCommand(this.world.scene, this.currentActivatableItem).execute();
                    break;
                case 'window':
                    new OpenWindowCommand(this.world.scene, this.currentActivatableItem).execute();
                    break;
                case 'cupboard':
                        new OpenInventoryCommand(this.services.toolServices).execute();
                        break;
                default:
                    break;
            }
        }
    }

    /**
     * If there is an `Actionable` mesh nearby it activates the default action on that mesh
     */
    public getClosestActivatableWorldItem(world: World): GameObject {
        const actionableObjects = this.filterActionableObjects(world);
        const reduceToClosestMeshModel = (val: [GameObject, number], current: GameObject): [GameObject, number] => {
            const distance =  world.player.boundingBox.getBoundingCenter().distanceTo(current.boundingBox.getBoundingCenter());
            return !val || val[1] > distance ? [current, distance] : val;
        };

        const closestItem = actionableObjects.reduce(reduceToClosestMeshModel, null);

        if (closestItem) {
            return closestItem[0];
        }

        return null;
    }

    private filterActionableObjects(worldMap: World) {
        return worldMap.worldItems.filter(obj => obj.animatedMeshes.length > 0 || obj.type === 'cupboard');
    }

}
