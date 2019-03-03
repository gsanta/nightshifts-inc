import { Mesh } from 'babylonjs';
import { VisualWorldItem } from '../../../world_items/VisualWorldItem';


export class Room extends VisualWorldItem {
    constructor(mesh: Mesh, name: string) {
        super(mesh, name);
    }
}
