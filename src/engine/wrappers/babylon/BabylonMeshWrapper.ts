import { MeshWrapper } from '../MeshWrapper';
import { Mesh, Vector3 } from 'babylonjs';
import { VectorModel, toVector3 } from '../../../game/model/core/VectorModel';
import { MeshTemplateConfig } from '../../../game/model/core/templates/MeshTemplate';
import * as _ from 'lodash';

export class BabylonMeshWrapper implements MeshWrapper<Mesh> {
    public wrappedMesh: Mesh;

    constructor(wrappedMesh: Mesh) {
        this.wrappedMesh = wrappedMesh;
    }

    public getXExtent(): number {
        return this.wrappedMesh.getBoundingInfo().boundingBox.extendSize.x;
    }

    public getYExtent(): number {
        return this.wrappedMesh.getBoundingInfo().boundingBox.extendSize.y;
    }

    public getZExtent(): number {
        return this.wrappedMesh.getBoundingInfo().boundingBox.extendSize.z;
    }

    public getScale(): VectorModel {
        return new VectorModel(this.wrappedMesh.scaling.x, this.wrappedMesh.scaling.y, this.wrappedMesh.scaling.z);
    }

    public setScale(vectorModel: Partial<VectorModel>) {

        if (_.isNumber(vectorModel.x)) {
            this.wrappedMesh.scaling.x = vectorModel.x;
        }

        if (_.isNumber(vectorModel.y)) {
            this.wrappedMesh.scaling.y = vectorModel.y;
        }

        if (_.isNumber(vectorModel.z)) {
            this.wrappedMesh.scaling.z = vectorModel.z;
        }
    }

    public translate(vectorModel: VectorModel) {
        this.wrappedMesh.translate(new Vector3(vectorModel.x, vectorModel.y, vectorModel.z), 1);
    }

    public intersectsPoint(vector: VectorModel) {
        return this.wrappedMesh.intersectsPoint(new Vector3(vector.x, vector.y, vector.z));
    }

    public getPosition(): VectorModel {
        const position = this.wrappedMesh.getAbsolutePosition();
        return new VectorModel(position.x, position.y, position.z);
    }

    public getRotation(): VectorModel {
        return this.toVectorModel(this.wrappedMesh.rotation);
    }

    public clone(id: string): BabylonMeshWrapper {
        const clonedMesh = this.wrappedMesh.clone(id);
        clonedMesh.isVisible = true;
        clonedMesh.setEnabled(true);

        return new BabylonMeshWrapper(clonedMesh);
    }

    public getId(): string {
        return this.wrappedMesh.name;
    }

    private toVectorModel(vector3: Vector3): VectorModel {
        return new VectorModel(vector3.x, vector3.y, vector3.z);
    }

    private initMesh(config: MeshTemplateConfig) {
        this.wrappedMesh.isPickable = true;
        this.wrappedMesh.isVisible = false;
        this.wrappedMesh.checkCollisions = config.checkCollisions;
        this.wrappedMesh.receiveShadows = config.receiveShadows;
        this.wrappedMesh.scaling = toVector3(config.scaling);

        if (!config.singleton) {
            this.wrappedMesh.setEnabled(false);
        }
    }
}
