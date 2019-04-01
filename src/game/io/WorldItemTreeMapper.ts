import {TreeNode, TreeIteratorGenerator} from 'game-worldmap-generator';
import { WorldItem } from '../world_items/WorldItem';
import { ContainerWorldItem } from '../../engine/world_items/ContainerWorldItem';
import { Room } from '../../engine/world_items/Room';


export class WorldItemTreeMapper {
    public mapTree(fromTree: TreeNode, fromToMap: Map<TreeNode, WorldItem>) {
        for (const from of TreeIteratorGenerator(fromTree)) {
            const to = fromToMap.get(from);
            if (from.children) {
                from.children.forEach(child => (<Room> to).addChild(fromToMap.get(child)));
            }

            if (from.borderItems) {
                from.borderItems.forEach(item => (<Room> to).addBorderItem(fromToMap.get(item)));
            }
        }
    }
}
