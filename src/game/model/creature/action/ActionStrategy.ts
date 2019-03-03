import { Player } from '../type/Player';
import { World } from '../../World';
import { VisualWorldItem } from '../../../world_items/VisualWorldItem';
import { VectorModel } from '../../core/VectorModel';


export class ActionStrategy {
    private player: Player;
    private worldMap: World;
    private actionableObjects: VisualWorldItem[];

    constructor(player: Player, worldMap: World) {
        this.player = player;
        this.worldMap = worldMap;
    }

    /**
     * If there is an `Actionable` mesh nearby it activates the default action on that mesh
     */
    public activateClosestMeshAction() {
        this.actionableObjects = this.filterActionableObjects(this.worldMap);
        const reduceToClosestMeshModel = (val: [VisualWorldItem, number], current: VisualWorldItem): [VisualWorldItem, number] => {
            const distance = VectorModel.Distance(this.player.getCenterPosition(), current.getPosition());
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
