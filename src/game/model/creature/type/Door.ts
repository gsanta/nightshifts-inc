import { MeshModel } from '../../core/MeshModel';
import { Mesh } from 'babylonjs';
import { VectorModel } from '../../core/VectorModel';

export class Door extends MeshModel {
    public isOpen: boolean;
    private pivotAngle: number;
    private pivotPosition: VectorModel;

    constructor(mesh: Mesh, pivotPosition: VectorModel, pivotAngle: number) {
        super(mesh);

        this.pivotPosition = pivotPosition;
        this.pivotAngle = pivotAngle;
        this.hasDefaultAction = true;
    }

    public doDefaultAction() {
        const originalPivotMatrix = this.mesh.getPivotMatrix();
        this.mesh.setPivotMatrix(BABYLON.Matrix.Translation(this.pivotPosition.x(), this.pivotPosition.y(), this.pivotPosition.z()));

        if (this.isOpen) {
            this.mesh.rotation.y = 0;
            this.isOpen = false;
        } else {
            this.mesh.rotation.y = this.pivotAngle;
            this.isOpen = true;
        }

        // this.mesh.setPivotMatrix(originalPivotMatrix);
    }
}
