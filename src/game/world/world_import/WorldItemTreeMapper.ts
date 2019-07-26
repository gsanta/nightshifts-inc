import {TreeNode, TreeIteratorGenerator} from '@nightshifts.inc/world-generator';
import { GameObject } from '../world_items/item_types/GameObject';


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
                    to.neighbours.push(fromToMap.get(item));
                    fromToMap.get(item).neighbours.push(to);
                });
            }
        }
    }
}
