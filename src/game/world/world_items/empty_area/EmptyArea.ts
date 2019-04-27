import { SimpleWorldItem } from '../SimpleWorldItem';
import { Mesh } from 'babylonjs';

export class EmptyArea extends SimpleWorldItem {
    constructor(mesh: Mesh) {
        super(mesh, 'empty');
    }
}

