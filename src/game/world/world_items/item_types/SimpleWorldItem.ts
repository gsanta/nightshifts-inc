import { StandardMaterial, Mesh, Vector3, Axis, Space, PhysicsImpostor } from '@babylonjs/core';
import { MeshTemplateConfig } from '../../../model/core/templates/MeshTemplate';
import { SerializedMeshModel, WorldItem } from './WorldItem';
import { VectorModel, toVector3 } from '../../../model/core/VectorModel';
import { ContainerWorldItem } from './ContainerWorldItem';
import { Rectangle, Polygon, Point } from '@nightshifts.inc/geometry';
import isNumber from 'lodash/isNumber';
import { WorldItemActionCommand } from '../action_strategies/WorldItemActionCommand';
import { EmptyCommand } from '../action_strategies/EmptyCommand';

export class SimpleWorldItem implements WorldItem {
    public mesh: Mesh;
    public boundingMesh?: Mesh;
    public type: string;
    public label: string;
    public hasDefaultAction = false;
    public parent: WorldItem;
    public neighbours: WorldItem[] = [];
    public material: StandardMaterial;
    public boundingMeshVisible = false;
    private impostor: PhysicsImpostor;

    private defaultAction: WorldItemActionCommand = new EmptyCommand();

    protected boundingBox: Polygon;

    protected counter = 1;

    constructor(mesh: Mesh, type: string, boundingBox: Polygon) {
        this.mesh = mesh;
        this.type = type;
        this.boundingBox = boundingBox;
    }

    public hasConnectionWith(worldItem: WorldItem): boolean {
        return this.neighbours.indexOf(worldItem) !== -1;
    }

    public getAllMeshes(): Mesh[] {
        return [this.mesh];
    }

    public doDefaultAction() {
        this.defaultAction.execute();
    }

    public setDefaultAction(command: WorldItemActionCommand) {
        this.defaultAction = command;
    }

    public serialize(): SerializedMeshModel {
        return {
            name: this.type,
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

    public unserialize(model: SerializedMeshModel): WorldItem {
        return null;
    }

    public clone() {
        const clonedMesh = this.mesh.clone(`${this.mesh.name}-${this.counter++}`);
        const name = this.type;

        const clone = new SimpleWorldItem(clonedMesh, name, this.boundingBox);
        this.copyTo(clone);

        return clone;
    }

    public rotateY(amount: number) {
        this.mesh.rotate(Axis.Y, amount, Space.WORLD);
    }

    public setPosition(position: VectorModel) {
        this.mesh.position = new Vector3(position.x, position.y, position.z);

        const boundingCenter = this.boundingBox.getBoundingCenter();
        const [dx, dy] = boundingCenter.distanceTo(new Point(position.x, position.z));

        this.boundingBox = this.boundingBox.addX(dx);
        this.boundingBox = this.boundingBox.addY(dy);

        if (this.boundingMesh) {
            this.boundingMesh.position = new Vector3(position.x, 1, position.z);
        }
    }

    public translate(vectorModel: VectorModel) {
        this.mesh.translate(new Vector3(vectorModel.x, vectorModel.y, vectorModel.z), 1);
    }

    public getHeight(): number {
        return this.mesh ? this.mesh.getBoundingInfo().boundingBox.maximumWorld.y * 2 : 12;
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
        const center = (<Rectangle> this.getBoundingBox()).getBoundingCenter();
        return new VectorModel(center.x, 0, center.y);
    }

    public getScale(): VectorModel {
        return new VectorModel(this.mesh.scaling.x, this.mesh.scaling.y, this.mesh.scaling.z);
    }

    public getRotation(): VectorModel {
        return new VectorModel(0, 0, 0);
    }

    public getBoundingMesh(): Mesh {
        return this.boundingMesh;
    }

    public setBoundingMesh(mesh: Mesh) {
        this.boundingMesh = mesh;
    }

    public setBoudingBox(polygon: Polygon) {
        this.boundingBox = polygon;
        const center = polygon.getBoundingCenter();
        this.setPosition(new VectorModel(center.x, this.mesh.position.y, center.y));
        this.boundingBox = polygon;
    }


    public getBoundingBox(): Polygon {
        return this.boundingBox;
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

        return this.getBoundingBox();
    }

    public setParent(worldItem: WorldItem) {
        this.mesh.parent = (<ContainerWorldItem> worldItem).mesh;
    }

    public intersectsPoint(vector: VectorModel) {
        return this.mesh.intersectsPoint(new Vector3(vector.x, vector.y, vector.z));
    }

    public intersectsWorldItem(otherWorldItem: WorldItem): boolean {
        return this.mesh.intersectsMesh(otherWorldItem.mesh);
    }

    public setVisible(isVisible: boolean) {
        this.mesh.isVisible = isVisible;
    }

    public setBoundingMeshVisible(isVisible: boolean) {
        this.boundingMesh.isVisible = isVisible;
        this.boundingMeshVisible = isVisible;
    }

    public isBoundingMeshVisible(): boolean {
        return this.boundingMeshVisible;
    }

    public setImpostor(impostor: PhysicsImpostor) {
        this.mesh.physicsImpostor = impostor;
        this.impostor = impostor;
    }

    protected copyTo(meshModel: WorldItem): WorldItem {
        meshModel.type = this.type;
        meshModel.hasDefaultAction = this.hasDefaultAction;

        return meshModel;
    }
}
