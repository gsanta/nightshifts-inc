import { VisualWorldItem, SerializedMeshModel } from '../../../world_items/VisualWorldItem';
import { Mesh } from 'babylonjs';
import { VectorModel } from '../../core/VectorModel';
import { MeshTemplateConfig } from '../../core/templates/MeshTemplate';

export class Door extends VisualWorldItem {
    public isOpen: boolean;
    private pivotAngle: number;
    private pivot: VectorModel;

    constructor(mesh: Mesh, name: string, config?: MeshTemplateConfig) {
        super(mesh, name, config);

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

    public clone(): Door {
        const clonedMesh = this.mesh.clone(`${this.mesh.name}-${this.counter++}`);
        clonedMesh.setEnabled(true);
        clonedMesh.isVisible = true;
        const name = this.name;

        const door = new Door(clonedMesh, name);
        this.copyTo(door);

        return door;
    }
}
