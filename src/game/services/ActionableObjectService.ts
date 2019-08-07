import _ from 'lodash';
import { OpenDoorCommand } from '../action_strategies/OpenDoorCommand';
import { OpenInventoryCommand } from '../action_strategies/OpenInventoryCommand';
import { OpenWindowCommand } from '../action_strategies/OpenWindowCommand';
import { Border } from '../model/game_objects/Border';
import { GameObject } from '../model/game_objects/GameObject';
import { Room } from '../model/game_objects/Room';
import { World } from '../model/game_objects/World';
import { ServiceFacade } from './ServiceFacade';


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

        const prevItem = _.find(this.world.worldItems, item => !item.meshes[0] || item.meshes[0].isVisible === true);

        if (prevItem && !this.world.config.displayBoundingBoxes && prevItem.meshes[0]) {
            prevItem.meshes[0].isVisible = false;
        }

        const activeRoom = <Room> _.find(this.world.getWorldItemsByName('room'), room => room.isActive);

        if (activeRoom.children.indexOf(gameObject) !== -1 || activeRoom.borders.indexOf(<Border> gameObject) !== -1) {
            gameObject.meshes[0].isVisible = true;
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
