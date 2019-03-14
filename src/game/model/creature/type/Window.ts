import { WorldItem, SerializedMeshModel } from '../../../world_items/WorldItem';
import { Mesh, Vector3 } from 'babylonjs';
import { VectorModel } from '../../core/VectorModel';
import _ = require('lodash');
import { MeshTemplateConfig } from '../../core/templates/MeshTemplate';

export class Window extends WorldItem {
    public isOpen: boolean;
    private pivotAngle: number;
    public meshes: Mesh[];
    private isHorizontal = true;

    private pivot1: VectorModel;
    private pivot2: VectorModel;
    public containerMesh: Mesh;

    constructor(meshes: Mesh[], config?: MeshTemplateConfig) {
        super(meshes[0], 'window', config);

        const [containerMesh, ...otherMeshes] = meshes;
        this.containerMesh = containerMesh;
        this.meshes = otherMeshes;
        this.hasDefaultAction = true;
    }

    public setPivots(pivot1: VectorModel, pivot2: VectorModel, pivotAngle: number) {
        this.pivotAngle = pivotAngle;
        this.pivot1 = pivot1;
        this.pivot2 = pivot2;

        this.meshes[2].setPivotMatrix(BABYLON.Matrix.Translation(pivot1.x(), pivot1.y(), pivot1.z()));
        this.meshes[3].setPivotMatrix(BABYLON.Matrix.Translation(pivot2.x(), pivot2.y(), pivot2.z()));
    }

    public doDefaultAction() {
        if (this.isOpen) {
            if (this.isHorizontal) {
                this.meshes[2].rotation.y = 0;
                this.meshes[3].rotation.y = 0;
            } else {
                this.meshes[2].rotation.y = 0;
                this.meshes[3].rotation.y = 0;
            }
            this.isOpen = false;
        } else {
            this.meshes[2].rotation.y = this.pivotAngle;
            this.meshes[3].rotation.y = - this.pivotAngle;
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

    public serialize(): SerializedMeshModel {
        const baseInfo = super.serialize();

        baseInfo.additionalData = {
            angle: this.pivotAngle,
            axis1: this.pivot1.serialize(),
            axis2: this.pivot2.serialize()
        };

        return baseInfo;
    }

    public clone(): Window {
        const containerMesh = this.containerMesh.clone(`${this.containerMesh.name}-${this.counter++}`);
        containerMesh.isVisible = false;

        const meshes = this.meshes.map(mesh => {
            const clonedMesh = mesh.clone(`${mesh.name}-${this.counter++}`);
            clonedMesh.isVisible = true;
            return clonedMesh;
        });

        meshes.forEach(mesh => mesh.parent = containerMesh);

        const window = new Window([containerMesh, ...meshes]);

        this.copyTo(window);

        return window;
    }
}
