import {TreeNode, TreeIteratorGenerator} from 'game-worldmap-generator';


export class WorldItemTreeMapper {

    public mapTree(fromTree: TreeNode, fromToMap: Map<TreeNode, TreeNode>) {
        for (const from of TreeIteratorGenerator(fromTree)) {
            const to = fromToMap.get(from);
            if (from.children) {
                from.children.forEach(child => to.addChild(fromToMap.get(child)));
            }

            if (from.borderItems) {
                from.borderItems.forEach(item => to.addBorderItem(fromToMap.get(item)));
            }
        }
    }
}
