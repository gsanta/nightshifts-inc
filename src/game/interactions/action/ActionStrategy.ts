import { Player } from '../../world/world_items/player/Player';
import { World } from '../../world/World';
import { WorldItem } from '../../world/world_items/WorldItem';
import { VectorModel } from '../../model/core/VectorModel';


export class ActionStrategy {
    private player: Player;
    private worldMap: World;
    private actionableObjects: WorldItem[];

    constructor(player: Player, worldMap: World) {
        this.player = player;
        this.worldMap = worldMap;
    }

    /**
     * If there is an `Actionable` mesh nearby it activates the default action on that mesh
     */
    public activateClosestMeshAction() {
        this.actionableObjects = this.filterActionableObjects(this.worldMap);
        const reduceToClosestMeshModel = (val: [WorldItem, number], current: WorldItem): [WorldItem, number] => {
            const distance = VectorModel.Distance(this.player.getCenterPosition(), current.getCenterPosition());
            return !val || val[1] > distance ? [current, distance] : val;
        };

        const meshModelAndDistanceTuple = this.actionableObjects.reduce(reduceToClosestMeshModel, null);

        if (meshModelAndDistanceTuple) {
            meshModelAndDistanceTuple[0].doDefaultAction();
        }
    }

    private filterActionableObjects(worldMap: World) {
        return worldMap.gameObjects.filter(obj => obj.hasDefaultAction);
    }
}
