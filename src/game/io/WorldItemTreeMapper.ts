import {TreeNode, TreeIteratorGenerator} from 'game-worldmap-generator';
import { WorldItem } from '../world_items/WorldItem';
import { ContainerWorldItem } from '../world_items/ContainerWorldItem';


export class WorldItemTreeMapper {
    public mapTree(fromTree: TreeNode, fromToMap: Map<TreeNode, WorldItem>) {
        for (const from of TreeIteratorGenerator(fromTree)) {
            const to = fromToMap.get(from);
            if (from.children) {
                from.children.forEach(child => (<ContainerWorldItem> to).addChild(fromToMap.get(child)));
            }

            if (from.borderItems) {
                from.borderItems.forEach(item => (<ContainerWorldItem> to).addBorderItem(fromToMap.get(item)));
            }
        }
    }
}
