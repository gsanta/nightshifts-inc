import { Mesh, Vector3, StandardMaterial } from 'babylonjs';
import { VectorModel, toVector3 } from '../model/core/VectorModel';
import { MeshTemplateConfig } from '../model/core/templates/MeshTemplate';

export interface SerializedMeshModel {
    name: string;
    scaling: {
        x: number,
        y: number,
        z: number
    };
    translate: {
        x: number,
        y: number,
        z: number
    };
    additionalData?: {
        axis?: {
            x: number,
            y: number,
            z: number
        };
        axis1?: {
            x: number,
            y: number,
            z: number
        };
        axis2?: {
            x: number,
            y: number,
            z: number
        };
        rotation?: number;
        angle?: number;
    };
}

export class VisualWorldItem {
    public mesh: Mesh;
    public name: string;
    public hasDefaultAction = false;
    private defaultMaterial: StandardMaterial;
    private darkMaterial: StandardMaterial;

    protected counter = 1;

    constructor(mesh: Mesh, name: string, config?: MeshTemplateConfig) {
        this.mesh = mesh;
        this.name = name;

        if (config) {
            this.initMesh(config);
        }
    }

    public translate(vectorModel: VectorModel) {
        this.mesh.translate(new Vector3(vectorModel.x(), vectorModel.y(), vectorModel.z()), 1);
    }

    public intersectsPoint(vector: VectorModel) {
        return this.mesh.intersectsPoint(new Vector3(vector.x(), vector.y(), vector.z()));
    }

    public getPosition(): VectorModel {
        const position = this.mesh.getAbsolutePosition();
        return new VectorModel(position.x, position.y, position.z);
    }

    public doDefaultAction() {
        throw new Error('No default action defined');
    }

    public getXExtent() {
        return this.mesh.getBoundingInfo().boundingBox.extendSize.x;
    }

    public getYExtent() {
        return this.mesh.getBoundingInfo().boundingBox.extendSize.y;
    }

    public getZExtent() {
        return this.mesh.getBoundingInfo().boundingBox.extendSize.z;
    }

    public getScale(): VectorModel {
        return new VectorModel(this.mesh.scaling.x, this.mesh.scaling.y, this.mesh.scaling.z);
    }

    public serialize(): SerializedMeshModel {
        return {
            name: this.name,
            scaling: {
                x: this.getScale().x(),
                y: this.getScale().y(),
                z: this.getScale().z(),
            },
            translate: {
                x: this.getPosition().x(),
                y: this.getPosition().y(),
                z: this.getPosition().z()
            },
            additionalData: {
                rotation: this.mesh.rotation.y
            }
        };
    }

    public unserialize(model: SerializedMeshModel): VisualWorldItem {
        return null;
    }

    public clone() {
        const clonedMesh = this.mesh.clone(`${this.mesh.name}-${this.counter++}`);
        clonedMesh.setEnabled(true);
        const name = this.name;

        const clone = new VisualWorldItem(clonedMesh, name);
        this.copyTo(clone);

        return clone;
    }

    protected copyTo(meshModel: VisualWorldItem): VisualWorldItem {
        meshModel.darkMaterial = this.darkMaterial;
        meshModel.defaultMaterial = this.defaultMaterial;
        meshModel.name = this.name;
        meshModel.hasDefaultAction = this.hasDefaultAction;

        return meshModel;
    }

    private initMesh(config: MeshTemplateConfig) {
        this.mesh.isPickable = true;
        this.mesh.isVisible = false;
        this.mesh.checkCollisions = config.checkCollisions;
        this.mesh.receiveShadows = config.receiveShadows;
        this.mesh.scaling = toVector3(config.scaling);

        if (!config.singleton) {
            this.mesh.setEnabled(false);
        }
    }
}
