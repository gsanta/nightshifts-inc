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

        // this.getPosition().x()
        // this.mesh.setPivotMatrix(BABYLON.Matrix.Translation(this.mesh.scaling.x / 2, 0, 0));

        if (this.isOpen) {
            // this.mesh.rotate(BABYLON.Axis.Y, 0, BABYLON.Space.LOCAL);
            this.mesh.rotation.y = 0;
            this.isOpen = false;
        } else {
            this.mesh.rotation.y = this.pivotAngle;
            // this.mesh.rotate(BABYLON.Axis.Y, this.pivotAngle, BABYLON.Space.LOCAL);
            this.isOpen = true;
        }

        // this.mesh.setPivotMatrix(originalPivotMatrix);
    }
}
