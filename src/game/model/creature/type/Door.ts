import { MeshModel, SerializedMeshModel } from '../../core/MeshModel';
import { Mesh } from 'babylonjs';
import { VectorModel } from '../../core/VectorModel';

export class Door extends MeshModel {
    public isOpen: boolean;
    private pivotAngle: number;
    private pivot: VectorModel;

    constructor(mesh: Mesh, name: string) {
        super(mesh, name);

        this.hasDefaultAction = true;
    }

    public setPivot(axis: VectorModel, angle: number) {
        this.pivotAngle = angle;
        this.pivot = axis;
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

    public serialize(): SerializedMeshModel {
        const baseInfo = super.serialize();

        baseInfo.additionalData = {
            angle: this.pivotAngle,
            axis: this.pivot.serialize(),
        };

        return baseInfo;
    }
}
