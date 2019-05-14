import { ActionHandler } from '../ActionHandler';
import { World } from '../../world/World';
import { GameActionType } from '../GameActionType';
import { WorldItem } from '../../world/world_items/item_types/WorldItem';
import { VectorModel } from '../../model/core/VectorModel';
import _ from 'lodash';
import { Room } from '../../world/world_items/item_types/Room';

export class WorldItemActivationActionHandler implements ActionHandler {

    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.PLAYER_MOVED:
                const worldItem = this.getClosestActivatableWorldItem(world);

                const prevItem = _.find(world.worldItems, item => item.isActivatableHighlightVisible === true);


                if (prevItem) {
                    prevItem.setActivatableHighlightVisible(false);
                }

                const activeRoom: Room = <Room> _.find(world.getWorldItemsByName('room'), (room: Room) => room.isActive);

                if (activeRoom.hasConnectionWith(worldItem)) {
                    worldItem.setActivatableHighlightVisible(true);
                }

                break;
            default:
                break;
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

        return actionableObjects.reduce(reduceToClosestMeshModel, null)[0];
    }

    private filterActionableObjects(worldMap: World) {
        return worldMap.worldItems.filter(obj => obj.hasDefaultAction);
    }
}
