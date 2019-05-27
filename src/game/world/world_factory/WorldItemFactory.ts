import { WorldItemInfo } from '@nightshifts.inc/world-generator';
import { World } from '../World';
import { WorldItem } from '../world_items/item_types/WorldItem';
import { Mesh, Skeleton } from '@babylonjs/core';


export interface WorldItemFactory {
    meshInfo: [Mesh[], Skeleton[]];
    /**
     * @deprecated `createItem` should not generate based on `WorldItemInfo` but some more general paremeters, so
     * it can be used on the fly not just for importing gwm file types.
     */
    createItem(worldItem: WorldItemInfo, world: World): WorldItem;
}
