import { MeshModel } from '../../core/MeshModel';
import { Mesh, Vector3 } from 'babylonjs';
import { VectorModel } from '../../core/VectorModel';
import _ = require('lodash');

export class Window extends MeshModel {
    public isOpen: boolean;
    private pivotAngle: number;
    private pivotPosition1: VectorModel;
    private pivotPosition2: VectorModel;
    private meshes: Mesh[];
    private isHorizontal = true;

    constructor(meshes: Mesh[], pivotPosition1: VectorModel, pivotPosition2: VectorModel, pivotAngle: number) {
        super(null);

        this.meshes = meshes;
        this.pivotPosition1 = pivotPosition1;
        this.pivotPosition2 = pivotPosition2;
        this.pivotAngle = pivotAngle;
        this.hasDefaultAction = true;

        // if (this.mesh.scaling.z > this.mesh.scaling.x) {
        //     this.isHorizontal = false;
        // }
    }

    public doDefaultAction() {
        const originalPivotMatrix = this.meshes[1].getPivotMatrix();
        this.meshes[1].setPivotMatrix(BABYLON.Matrix.Translation(this.pivotPosition1.x(), this.pivotPosition1.y(), this.pivotPosition1.z()));
        this.meshes[2].setPivotMatrix(BABYLON.Matrix.Translation(this.pivotPosition2.x(), this.pivotPosition2.y(), this.pivotPosition2.z()));


        if (this.isOpen) {
            if (this.isHorizontal) {
                this.meshes[1].rotation.y = 0;
                this.meshes[2].rotation.y = 0;
            } else {
                this.meshes[1].rotation.y = 0;
                this.meshes[2].rotation.y = 0;
            }
            this.isOpen = false;
        } else {
            this.meshes[1].rotation.y = this.pivotAngle;
            this.meshes[2].rotation.y = - this.pivotAngle;
            this.isOpen = true;
        }
    }

    public getPosition(): VectorModel {
        const position = this.meshes[1].getAbsolutePosition();
        return new VectorModel(position.x, position.y, position.z);
    }

    public translate(vectorModel: VectorModel) {
        this.meshes.forEach(mesh => mesh.translate(new Vector3(vectorModel.x(), vectorModel.y(), vectorModel.z()), 1));
    }

    public intersectsPoint(vector: VectorModel) {
        return _.some(this.meshes, mesh => mesh.intersectsPoint(new Vector3(vector.x(), vector.y(), vector.z())));
    }
}
