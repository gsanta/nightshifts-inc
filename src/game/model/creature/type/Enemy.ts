import { Creature } from './Creature';
import { Scene, MeshBuilder, Vector3, Mesh, StandardMaterial } from 'babylonjs';
import { MeshWrapper } from '../../../../engine/wrappers/MeshWrapper';
import { BabylonMeshWrapper } from '../../../../engine/wrappers/babylon/BabylonMeshWrapper';
declare const DEBUG;

export class Enemy extends Creature {
    private visibleMaterial: StandardMaterial = null;
    private inVisibleMaterial: StandardMaterial = null;
    private scene: Scene;
    private isVisible = true;

    constructor(mesh: BabylonMeshWrapper, scene: Scene) {
        super(mesh, null);
        this.scene = scene;

        this.initMaterials();
        this.mesh.wrappedMesh.material = this.visibleMaterial;
        this.mesh.wrappedMesh.checkCollisions = true;
        this.mesh.wrappedMesh.position = new Vector3(20, 0, 30);
        this.mesh.wrappedMesh.rotationQuaternion = BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, 0);
    }

    public setRotation(distance: number) {
        this.mesh.wrappedMesh.rotate(BABYLON.Axis.Y, distance, BABYLON.Space.WORLD);
    }

    public getBody(): Mesh {
        return this.mesh.wrappedMesh;
    }

    public playWalkingAnimation() {
        throw new Error('Method not implemented.');
    }
    public playIdleAnimation() {
        throw new Error('Method not implemented.');
    }

    public setIsVisible(isVisible: boolean) {
        if (this.isVisible === isVisible) {
            return;
        }

        this.isVisible = isVisible;
        this.sensor.setIsVisible(this.isVisible);

        if (isVisible) {
            this.mesh.wrappedMesh.material = this.visibleMaterial;
        } else {
            this.mesh.wrappedMesh.material = this.inVisibleMaterial;
        }
    }

    private initMaterials() {
        this.visibleMaterial = new StandardMaterial('enemy-visible-material', this.scene);
        this.visibleMaterial.emissiveColor = new BABYLON.Color3(0, 0, 1);

        this.inVisibleMaterial = new StandardMaterial('enemy-non-visible-material', this.scene);
        this.inVisibleMaterial.emissiveColor = new BABYLON.Color3(0, 0, 1);

        if (DEBUG) {
            this.inVisibleMaterial.alpha = 0.1;
        } else {
            this.inVisibleMaterial.alpha = 0;
        }
    }
}
