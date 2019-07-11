import { World } from '../world/World';
import _ from 'lodash';
import { WorldItem } from '../world/world_items/item_types/WorldItem';
import { VectorModel } from '../model/core/VectorModel';


export class ActionableObjectService {
    private world: World;
    private currentActivatableItem: WorldItem;

    constructor(world: World) {
        this.world = world;
    }

    public calcClosestActionableObject() {
        const worldItem = this.getClosestActivatableWorldItem(this.world);
        this.currentActivatableItem = worldItem;

        const prevItem = _.find(this.world.worldItems, item => item.isBoundingMeshVisible() === true);


        if (prevItem && !this.world.config.displayBoundingBoxes) {
            prevItem.setBoundingMeshVisible(false);
        }

        const activeRoom: WorldItem = _.find(this.world.getWorldItemsByName('room'), room => room.isActive);

        if (activeRoom.hasConnectionWith(worldItem)) {
            worldItem.setBoundingMeshVisible(true);
        }
    }

    public activateClosestActionableObject() {
        if (this.currentActivatableItem) {
            this.currentActivatableItem.doDefaultAction();
        }
    }

    /**
     * If there is an `Actionable` mesh nearby it activates the default action on that mesh
     */
    public getClosestActivatableWorldItem(world: World): WorldItem {
        const actionableObjects = this.filterActionableObjects(world);
        const reduceToClosestMeshModel = (val: [WorldItem, number], current: WorldItem): [WorldItem, number] => {
            const distance = VectorModel.Distance(world.player.getCenterPosition(), current.getCenterPosition());
            return !val || val[1] > distance ? [current, distance] : val;
        };

        const closestItem = actionableObjects.reduce(reduceToClosestMeshModel, null);

        if (closestItem) {
            return closestItem[0];
        }

        return null;
    }

    private filterActionableObjects(worldMap: World) {
        return worldMap.worldItems.filter(obj => obj.hasDefaultAction);
    }

}
