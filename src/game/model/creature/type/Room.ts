import { Mesh } from 'babylonjs';
import { WorldItem } from '../../../world_items/WorldItem';


export class Room extends WorldItem {
    constructor(mesh: Mesh, name: string) {
        super(mesh, name);
    }
}
