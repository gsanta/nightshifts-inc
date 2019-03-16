import { WorldItem, SerializedMeshModel } from '../../../world_items/WorldItem';
import { Mesh } from 'babylonjs';
import { VectorModel } from '../../core/VectorModel';
import { MeshTemplateConfig } from '../../core/templates/MeshTemplate';
import { MeshWrapper } from '../../../../engine/wrappers/MeshWrapper';

export class Door extends WorldItem {
    public isOpen: boolean;
    private pivotAngle: number;
    private pivot: VectorModel;

    constructor(mesh: MeshWrapper<any>, name: string, config?: MeshTemplateConfig) {
        super(mesh, name, config);

        this.hasDefaultAction = true;
    }

    public setPivot(axis: VectorModel, angle: number) {
        this.pivotAngle = angle;
        this.pivot = axis;
        this.mesh.wrappedMesh.setPivotMatrix(BABYLON.Matrix.Translation(axis.x, axis.y, axis.z));
    }

    public doDefaultAction() {
        if (this.isOpen) {
            this.mesh.wrappedMesh.rotation.y = 0;
            this.isOpen = false;
        } else {
            this.mesh.wrappedMesh.rotation.y = this.pivotAngle;
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
        const clonedMesh = this.mesh.clone(`${this.mesh.getId()}-${this.counter++}`);
        const name = this.name;

        const door = new Door(clonedMesh, name);
        this.copyTo(door);

        return door;
    }
}
