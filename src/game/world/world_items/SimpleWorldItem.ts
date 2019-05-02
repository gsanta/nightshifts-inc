import { StandardMaterial, Mesh, Vector3 } from 'babylonjs';
import { MeshTemplateConfig } from '../../model/core/templates/MeshTemplate';
import { SerializedMeshModel, WorldItem } from './WorldItem';
import { VectorModel, toVector3 } from '../../model/core/VectorModel';
import { ContainerWorldItem } from './ContainerWorldItem';
import { Rectangle, Polygon, Point } from '@nightshifts.inc/geometry';
import isNumber from 'lodash/isNumber';

export class SimpleWorldItem<M = Mesh> implements WorldItem {
    public mesh: Mesh;
    public name: string;
    public hasDefaultAction = false;
    public parent: WorldItem;
    public neighbours: WorldItem[] = [];
    public material: StandardMaterial;

    protected counter = 1;

    constructor(mesh: Mesh, name: string, config?: MeshTemplateConfig) {
        this.mesh = mesh;
        this.name = name;
    }

    public getAllMeshes(): Mesh[] {
        return [this.mesh];
    }

    public doDefaultAction() {
        throw new Error('No default action defined');
    }

    public serialize(): SerializedMeshModel {
        return {
            name: this.name,
            scaling: {
                x: this.getScale().x,
                y: this.getScale().y,
                z: this.getScale().z,
            },
            translate: {
                x: this.getCenterPosition().x,
                y: this.getCenterPosition().y,
                z: this.getCenterPosition().z
            },
            additionalData: {
                rotation: this.getRotation().y
            }
        };
    }

    public unserialize(model: SerializedMeshModel): SimpleWorldItem<M> {
        return null;
    }

    public clone() {
        const clonedMesh = this.mesh.clone(`${this.mesh.name}-${this.counter++}`);
        const name = this.name;

        const clone = new SimpleWorldItem(clonedMesh, name);
        this.copyTo(clone);

        return clone;
    }

    public rotateAtCenter(vectorModel: VectorModel, amount: number): void {
        this.mesh.rotate(toVector3(vectorModel), amount);
    }

    public translate(vectorModel: VectorModel) {
        this.mesh.translate(new Vector3(vectorModel.x, vectorModel.y, vectorModel.z), 1);
    }

    public scale(vectorModel: VectorModel) {
        if (isNumber(vectorModel.x)) {
            this.mesh.scaling.x = vectorModel.x;
        }

        if (isNumber(vectorModel.y)) {
            this.mesh.scaling.y = vectorModel.y;
        }

        if (isNumber(vectorModel.z)) {
            this.mesh.scaling.z = vectorModel.z;
        }
    }

    public getCenterPosition(): VectorModel {
        const center = (<Rectangle> this.getAbsoluteBoundingPolygon()).getBoundingCenter();
        return new VectorModel(center.x, 0, center.y);
    }

    public getScale(): VectorModel {
        return new VectorModel(this.mesh.scaling.x, this.mesh.scaling.y, this.mesh.scaling.z);
    }

    public getRotation(): VectorModel {
        return new VectorModel(0, 0, 0);
    }

    public getBoundingPolygon(): Polygon {
        const mesh: any = this.mesh;
        const width = mesh.geometry.extend.maximum.x - mesh.geometry.extend.minimum.x;
        const height = mesh.geometry.extend.maximum.z - mesh.geometry.extend.minimum.z;
        const position = (this.mesh as any).getAbsolutePosition();
        const centerPoint = new Point(position.x, position.z);

        return new Rectangle(centerPoint.x - width / 2, centerPoint.y - height / 2, width, height);
    }

    public getAbsoluteBoundingPolygon(): Polygon {
        const parentCenter = this.parent ? this.parent.getCenterPosition() : new VectorModel(0, 0, 0);
        const mesh: any = this.mesh;
        const width = mesh.geometry.extend.maximum.x - mesh.geometry.extend.minimum.x;
        const height = mesh.geometry.extend.maximum.z - mesh.geometry.extend.minimum.z;
        const position = this.mesh.getPositionExpressedInLocalSpace();
        const centerPoint = new Point(position.x, position.z);

        return new Rectangle(centerPoint.x - width / 2, centerPoint.y - height / 2, width, height).translate(new Point(parentCenter.x, parentCenter.z));
        // if (this.parent) {
        //     const parentBoundingPolygon = this.parent.getBoundingPolygon();
        //     return this.getBoundingPolygon().translate(new Point(parentBoundingPolygon.left, parentBoundingPolygon.top));
        // }

        return this.getBoundingPolygon();
    }

    public setParent(worldItem: WorldItem) {
        this.mesh.parent = (<ContainerWorldItem> worldItem).mesh;
    }

    public intersectsPoint(vector: VectorModel) {
        return this.mesh.intersectsPoint(new Vector3(vector.x, vector.y, vector.z));
    }

    protected copyTo(meshModel: WorldItem): WorldItem {
        meshModel.name = this.name;
        meshModel.hasDefaultAction = this.hasDefaultAction;

        return meshModel;
    }
}
