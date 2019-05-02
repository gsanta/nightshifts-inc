import { Creature } from '../Creature';
import { Scene, MeshBuilder, Vector3, Mesh, StandardMaterial, Quaternion, Axis, Space, Color3 } from 'babylonjs';
declare const DEBUG;

export class Enemy extends Creature {
    private visibleMaterial: StandardMaterial = null;
    private inVisibleMaterial: StandardMaterial = null;
    private scene: Scene;
    private isVisible = true;

    constructor(mesh: Mesh, scene: Scene) {
        super(mesh, null);
        this.scene = scene;

        this.initMaterials();
        this.mesh.material = this.visibleMaterial;
        this.mesh.checkCollisions = true;
        this.mesh.rotationQuaternion = Quaternion.RotationAxis(Axis.Y, 0);
    }

    public setRotation(distance: number) {
        this.mesh.rotate(Axis.Y, distance, Space.WORLD);
    }

    public getBody(): Mesh {
        return this.mesh;
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
            this.mesh.material = this.visibleMaterial;
        } else {
            this.mesh.material = this.inVisibleMaterial;
        }
    }

    private initMaterials() {
        this.visibleMaterial = new StandardMaterial('enemy-visible-material', this.scene);
        this.visibleMaterial.emissiveColor = new Color3(0, 0, 1);

        this.inVisibleMaterial = new StandardMaterial('enemy-non-visible-material', this.scene);
        this.inVisibleMaterial.emissiveColor = new Color3(0, 0, 1);

        if (DEBUG) {
            this.inVisibleMaterial.alpha = 0.1;
        } else {
            this.inVisibleMaterial.alpha = 0;
        }
    }
}
