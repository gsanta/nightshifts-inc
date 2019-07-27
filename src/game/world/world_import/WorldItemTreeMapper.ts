import {TreeNode, TreeIteratorGenerator} from '@nightshifts.inc/world-generator';
import { GameObject } from '../world_items/item_types/GameObject';
import { Room } from '../world_items/item_types/Room';
import { Border } from '../world_items/item_types/Border';


export class WorldItemTreeMapper {
    public mapTree(fromTree: TreeNode, fromToMap: Map<TreeNode, GameObject>) {
        for (const from of TreeIteratorGenerator(fromTree)) {
            const to = fromToMap.get(from);

            if (from.children) {
                from.children.forEach(child => {
                    if (fromToMap.get(child)) {
                        to.children.push(fromToMap.get(child));
                    }
                });
            }

            if (from.borderItems) {
                from.borderItems.forEach(item => {
                    (<Room> to).borders.push(<Border> fromToMap.get(item));
                    (<Border> fromToMap.get(item)).rooms.push(<Room> to);
                });
            }
        }
    }
}
