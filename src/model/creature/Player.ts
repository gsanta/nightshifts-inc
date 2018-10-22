import { Creature } from "./Creature";
import { Scene, SpotLight, MeshBuilder, Vector3, Mesh, Light } from "babylonjs";
import { ModelLoader } from "../io/ModelLoader";
import { AnimatedModel } from '../io/AnimatedModel';
import { CreatureAnimationMesh } from '../mesh/CreatureAnimationMesh';


export class Player extends Creature {
    private light: Light;
    private modelLoader: ModelLoader;
    private creatureAnimationMesh: CreatureAnimationMesh;

    constructor(scene: Scene, light: Light) {
        super();

        this.modelLoader = new ModelLoader("../models/dude/", scene);
        this.light = light;

        const that: any = this;

        this.modelLoader.load("Dude.babylon")
            .then((animatedModel: AnimatedModel) => {
                that.creatureAnimationMesh = new CreatureAnimationMesh(
                    animatedModel,
                    {
                        idleInterval: null,
                        walkingInterval: {
                            from: 0,
                            to: 100
                        }
                    },
                    that.scene
                )
                animatedModel.meshes[0].scaling = new Vector3(0.1, 0.1, 0.1);
                // meshes[0].rotation.y = Math.PI * 3 / 2;
                scene.beginAnimation(animatedModel.skeletons[0], 0, 100, true, 1.0);
                that.body = animatedModel.meshes[0];
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

    public walk() {

    }

    public idle() {

    }

    public getBody(): Mesh {
        return this.body;
    }

    private animate() {

    }
}