import { Mesh, Vector3, StandardMaterial } from 'babylonjs';
import { VectorModel, toVector3 } from './VectorModel';
import { MeshConfig } from './templates/MeshTemplate';

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

export class MeshModel {
    public mesh: Mesh;

    public defaultMaterial: StandardMaterial;
    public darkMaterial: StandardMaterial;
    public name: string;
    public hasDefaultAction = false;

    private counter = 1;

    constructor(meshConfig?: MeshConfig) {

        if (meshConfig) {
            this.mesh = meshConfig.meshes[0];
            this.name = meshConfig.name;
            this.defaultMaterial = meshConfig.materials.default;
            this.darkMaterial = meshConfig.materials.dark;

            this.initMesh(this.mesh, meshConfig);
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

    public unserialize(model: SerializedMeshModel): MeshModel {
        return null;
    }

    public clone(): MeshModel {
        const clonedMesh = this.mesh.clone(`${this.mesh.name}-${this.counter++}`);
        const clone = new MeshModel();
        clone.mesh = clonedMesh;
        clone.darkMaterial = this.darkMaterial;
        clone.defaultMaterial = this.defaultMaterial;
        clone.name = this.name;
        clone.hasDefaultAction = this.hasDefaultAction;

        return clone;
    }

    protected copyTo(meshModel: MeshModel) {
        const clonedMesh = this.mesh.clone(`${this.mesh.name}-${this.counter++}`);
        meshModel.mesh = clonedMesh;
        meshModel.darkMaterial = this.darkMaterial;
        meshModel.defaultMaterial = this.defaultMaterial;
        meshModel.name = this.name;
        meshModel.hasDefaultAction = this.hasDefaultAction;
    }

    private initMesh(mesh: Mesh, config: MeshConfig) {
            mesh.isPickable = true;
            mesh.isVisible = false;
            mesh.checkCollisions = config.checkCollisions;
            mesh.receiveShadows = config.receiveShadows;
            mesh.scaling = toVector3(config.scaling);
    }
}
