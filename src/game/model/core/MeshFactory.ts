import { StandardMaterial, Scene, MeshBuilder, ShadowGenerator, Light, SpotLight } from 'babylonjs';
import { VectorModel } from './VectorModel';
import { MeshModel } from './MeshModel';
import { Player } from '../creature/type/Player';
import { UserInputEventEmitter } from '../creature/motion/UserInputEventEmitter';
import { CollisionDetector } from '../creature/collision/CollisionDetector';
import { ManualMotionStrategy } from '../creature/motion/ManualMotionStrategy';
import { EyeSensor } from '../creature/sensor/EyeSensor';

export class MeshFactory {
    private wallMaterial: StandardMaterial;
    private scene: Scene;
    private shadowGenerator: ShadowGenerator;
    private idCounter = 0;
    private spotLight: SpotLight;

    constructor(scene: Scene, wallMaterial: StandardMaterial, shadowGenerator: ShadowGenerator) {
        this.wallMaterial = wallMaterial;
        this.scene = scene;
        this.shadowGenerator = shadowGenerator;
        this.spotLight = this.createSpotLight();
        this.shadowGenerator = this.createShadow(this.spotLight);
    }

    public createWall(translate: VectorModel, dimensions: VectorModel): MeshModel {
        const blueMat = new BABYLON.StandardMaterial('blueMat', this.scene);
        blueMat.emissiveColor = new BABYLON.Color3(0, 0, 1);
        const mesh = MeshBuilder.CreateBox(
            'wall-' + this.idCounter++,
            { width: dimensions.x(), depth: dimensions.z(), height: dimensions.y() },
            this.scene
        );

        mesh.checkCollisions = true;
        mesh.isPickable = true;
        mesh.material = this.wallMaterial;
        mesh.receiveShadows = true;

        const meshModel = new MeshModel(mesh);
        meshModel.translate(translate);

        const shadowMap = this.shadowGenerator.getShadowMap();
        if (shadowMap && shadowMap.renderList) {
            shadowMap.renderList.push(mesh);
        }

        meshModel.name = 'wall';

        return meshModel;
    }

    public createPlayer(translate: VectorModel) {
        const player = new Player(this.scene, this.spotLight, translate);

        const keyboardHandler = new UserInputEventEmitter();
        const collisionDetector = new CollisionDetector(player, this.scene)
        const manualMotionStrategy = new ManualMotionStrategy(player, collisionDetector, keyboardHandler);
        keyboardHandler.subscribe();

        player.setMotionStrategy(manualMotionStrategy)
        player.setSensor(new EyeSensor(player, this.scene));

        return player;
    }

    public createWindow(translate: VectorModel, dimensions: VectorModel): MeshModel {
        return this.createWall(translate, dimensions);
    }


    public createDoor(translate: VectorModel, dimensions: VectorModel): MeshModel {
        const meshModel = this.createWall(translate, dimensions);
        meshModel.name = 'door';
        return meshModel;
    }

    public createFloor(translate: VectorModel, dimensions: VectorModel): MeshModel {
        const groundMaterial = new BABYLON.StandardMaterial('groundMaterial', this.scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture('../models/floor_texture.jpg', this.scene);

        const ground = BABYLON.MeshBuilder.CreateGround(
            'ground',
            { width: dimensions.x(), height: dimensions.z() },
            this.scene
        );
        ground.receiveShadows = true;
        ground.material = groundMaterial;

        const meshModel = new MeshModel(ground);
        meshModel.name = 'floor';
        // translate.setZ(- (dimensions.z() / 2));
        // translate.setX(- 5);
        translate.setZ(-3);
        meshModel.translate(translate);

        return meshModel;
    }

    private createSpotLight(): SpotLight {
        const spotLight = new BABYLON.SpotLight('spotLight', new BABYLON.Vector3(1, 1, 1), new BABYLON.Vector3(0, -1, -5), Math.PI / 4, 1, this.scene);
        spotLight.diffuse = new BABYLON.Color3(1, 1, 0.6);
        spotLight.specular = new BABYLON.Color3(1, 1, 0.6);

        return spotLight;
    };

    private createShadow(spotLight: SpotLight): ShadowGenerator {
        const shadowGenerator = new BABYLON.ShadowGenerator(1024, spotLight);
        shadowGenerator.usePoissonSampling = true;

        return shadowGenerator;
    }
}
