import { Mesh } from 'babylonjs';
import { MeshModel } from '../../core/MeshModel';


export class Room extends MeshModel {
    constructor(mesh: Mesh, name: string) {
        super(mesh, name);
    }
}
