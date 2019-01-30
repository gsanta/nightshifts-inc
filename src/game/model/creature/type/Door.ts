import { MeshModel } from '../../core/MeshModel';
import { Mesh } from 'babylonjs';
import { VectorModel } from '../../core/VectorModel';

export class Door extends MeshModel {
    public isOpen: boolean;
    private pivotAngle: number;

    constructor(mesh: Mesh, name: string) {
        super(mesh, name);

        this.hasDefaultAction = true;
    }

    public setPivot(axis: VectorModel, angle: number) {
        this.pivotAngle = angle;
        this.mesh.setPivotMatrix(BABYLON.Matrix.Translation(axis.x(), axis.y(), axis.z()));
    }

    public doDefaultAction() {
        if (this.isOpen) {
            this.mesh.rotation.y = 0;
            this.isOpen = false;
        } else {
            this.mesh.rotation.y = this.pivotAngle;
            this.isOpen = true;
        }
    }
}
