import { Creature } from "./Creature";
import { Scene, SpotLight, MeshBuilder, Vector3, Mesh, Light } from "babylonjs";


export class Player extends Creature {
    private light: Light;

    constructor(scene: Scene, light: Light) {
        super();

        this.light = light;

        const that: any = this;

        BABYLON.SceneLoader.ImportMesh("", "../models/dude/", "Dude.babylon", scene, 
            (meshes: BABYLON.AbstractMesh[], particleSystems: BABYLON.ParticleSystem[], skeletons: BABYLON.Skeleton[], animationGroups: BABYLON.AnimationGroup[]) => {
            meshes[0].scaling = new Vector3(0.1, 0.1, 0.1);
            // meshes[0].rotation.y = Math.PI * 3 / 2;
            scene.beginAnimation(skeletons[0], 0, 100, true, 1.0);
            that.body = meshes[0];
            that.body.checkCollisions = true;
            var quaternion = BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, Math.PI / 2);
            that.body.rotationQuaternion = quaternion;
            that.light.parent = that.body;
        });

        // var redMat = new BABYLON.StandardMaterial("redMat", scene);
        // redMat.emissiveColor = new BABYLON.Color3(1, 0, 0);
        // this.body = MeshBuilder.CreateSphere("player", { diameter: 1 }, scene);
        // this.body.material = redMat;
    }

    public translate(axis: Vector3, distance: number) {
        this.body.translate(axis, distance);
    }

    public rotate(distance: number) {
        this.body.rotate(BABYLON.Axis.Y, distance, BABYLON.Space.WORLD);
    }

    public getBody(): Mesh {
        return this.body;
    }

    private animate() {

    }

    private loadModel() {}
}