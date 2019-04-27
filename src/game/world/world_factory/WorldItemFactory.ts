import { GwmWorldItem } from 'game-worldmap-generator';
import { World } from '../World';
import { WorldItem } from '../world_items/WorldItem';


export interface WorldItemFactory {
    /**
     * @deprecated `createItem` should not generate based on `GwmWorldItem` but some more general paremeters, so
     * it can be used on the fly not just for importing gwm file types.
     */
    createItem(worldItem: GwmWorldItem, world: World): WorldItem;
}
