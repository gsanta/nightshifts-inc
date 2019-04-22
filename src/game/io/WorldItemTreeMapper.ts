import {TreeNode, TreeIteratorGenerator} from 'game-worldmap-generator';
import { WorldItem } from '../world_items/WorldItem';
import { ContainerWorldItem } from '../../engine/world_items/ContainerWorldItem';
import { Room } from '../../engine/world_items/Room';
import { Border } from '../model/creature/type/Border';


export class WorldItemTreeMapper {
    public mapTree(fromTree: TreeNode, fromToMap: Map<TreeNode, WorldItem>) {
        for (const from of TreeIteratorGenerator(fromTree)) {
            const to = fromToMap.get(from);
            if (from.children) {
                from.children.forEach(child => (<Room> to).addChild(fromToMap.get(child)));
            }

            if (from.borderItems) {
                from.borderItems.forEach(item => {
                    // to.neighbours.push(fromToMap.get(item));
                    this.setNeigbourForRoom(<Room> to, <Border><unknown> fromToMap.get(item));
                });
            }
        }
    }

    private setNeigbourForRoom(room: Room, borderItem:  Border) {
        const side1 = borderItem.sides[0];
        const side2 = borderItem.sides[1];

        const side1BoundingPolygon = side1.getBoundingPolygon();
        const roomBoundingPolygon = room.getBoundingPolygon();

        if (roomBoundingPolygon.containsMoreThenHalf(side1BoundingPolygon)) {
            room.neighbours.push(side1);
        } else {
            room.neighbours.push(side2);
        }
    }
}
