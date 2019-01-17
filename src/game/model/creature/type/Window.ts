import { MeshModel } from '../../core/MeshModel';
import { Mesh, Vector3 } from 'babylonjs';
import { VectorModel } from '../../core/VectorModel';
import _ = require('lodash');

export class Window extends MeshModel {
    public isOpen: boolean;
    private pivotAngle: number;
    private meshes: Mesh[];
    private isHorizontal = true;

    constructor(meshes: Mesh[]) {
        super(meshes[0]);

        this.meshes = meshes;
        this.hasDefaultAction = true;
    }

    public setPivots(pivot1: VectorModel, pivot2: VectorModel, pivotAngle: number) {
        this.pivotAngle = pivotAngle;

        this.meshes[3].setPivotMatrix(BABYLON.Matrix.Translation(pivot1.x(), pivot1.y(), pivot1.z()));
        this.meshes[4].setPivotMatrix(BABYLON.Matrix.Translation(pivot2.x(), pivot2.y(), pivot2.z()));
    }

    public doDefaultAction() {
        if (this.isOpen) {
            if (this.isHorizontal) {
                this.meshes[3].rotation.y = 0;
                this.meshes[4].rotation.y = 0;
            } else {
                this.meshes[3].rotation.y = 0;
                this.meshes[4].rotation.y = 0;
            }
            this.isOpen = false;
        } else {
            this.meshes[3].rotation.y = this.pivotAngle;
            this.meshes[4].rotation.y = - this.pivotAngle;
            this.isOpen = true;
        }
    }

    public getPosition(): VectorModel {
        const position = this.mesh.getAbsolutePosition();
        return new VectorModel(position.x, position.y, position.z);
    }

    public translate(vectorModel: VectorModel) {
        this.meshes.forEach(mesh => mesh.translate(new Vector3(vectorModel.x(), vectorModel.y(), vectorModel.z()), 1));
    }

    public intersectsPoint(vector: VectorModel) {
        return _.some(this.meshes, mesh => mesh.intersectsPoint(new Vector3(vector.x(), vector.y(), vector.z())));
    }
}
