import { Scene, Light, Mesh, ShadowGenerator, SpotLight } from 'babylonjs';
import { Enemy } from '../model/creature/type/Enemy';
import { MeshFactory } from '../model/core/MeshFactory';
import { VectorModel } from '../model/core/VectorModel';
import { ManualMotionStrategy } from '../model/creature/motion/ManualMotionStrategy';
import { WanderingMotionStrategy } from '../model/creature/motion/WanderingMotionStrategy';
import { SceneModel, Rectangle } from '../model/core/SceneModel';
import { UserInputEventEmitter } from '../model/creature/motion/UserInputEventEmitter';
import { MeshModel } from '../model/core/MeshModel';
import { EyeSensor } from '../model/creature/sensor/EyeSensor';
import { HearingSensor } from '../model/creature/sensor/HearingSensor';
import { Player } from '../model/creature/type/Player';
import { FieldMap } from '../model/field/FieldMap';
import { CollisionDetector } from '../model/creature/collision/CollisionDetector';
import { FieldMapBuilder } from '../model/field/FieldMapBuilder';

export const createLevel1FieldMap = (scene: Scene): FieldMap => {
    const sceneModel = new SceneModel(scene, new Rectangle(-50, -50, 100, 100));

    createCamera(scene);
    createHemisphericLight(scene);
    const spotLight = <SpotLight> createSpotLight(scene);
    createGround(scene);
    const shadowGenerator = createShadow(scene, spotLight);
    const player = createPlayer(scene, spotLight);
    const meshFactory = createMeshFactory(scene, shadowGenerator);
    const walls = createWalls(meshFactory);
    const enemies = createEnemies(scene, sceneModel, walls);


    const fieldMapBuilder = new FieldMapBuilder();
    fieldMapBuilder.addObstacles(walls);
    fieldMapBuilder.addPlayer(player);
    fieldMapBuilder.addEnemies(enemies);

    return fieldMapBuilder.build();
};

const createHemisphericLight = (scene: Scene): Light => {
    const light = new BABYLON.HemisphericLight('HemiLight', new BABYLON.Vector3(0, 1, 0), scene);
    light.diffuse = new BABYLON.Color3(0.27, 0.37, 0.41);

    return light;
};

const createSpotLight = (scene: Scene): Light => {
    const spotLight = new BABYLON.SpotLight('spotLight', new BABYLON.Vector3(1, 1, 1), new BABYLON.Vector3(0, -1, -5), Math.PI / 4, 1, scene);
    spotLight.diffuse = new BABYLON.Color3(1, 1, 0.6);
    spotLight.specular = new BABYLON.Color3(1, 1, 0.6);

    return spotLight;
};

const createGround = (scene: Scene): Mesh => {
    const groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
	groundMaterial.diffuseTexture = new BABYLON.Texture('../models/floor_texture.jpg', scene);

    const ground = BABYLON.MeshBuilder.CreateGround('ground', {width: 100, height: 100}, scene);
    ground.receiveShadows = true;
    ground.material = groundMaterial;

    return ground;
};

const createShadow = (scene: Scene, spotLight: SpotLight): ShadowGenerator => {
    const shadowGenerator = new BABYLON.ShadowGenerator(1024, spotLight);
    shadowGenerator.usePoissonSampling = true;

    return shadowGenerator;
}

const createPlayer = (scene: Scene, spotLight: SpotLight) => {
    const player = new Player(scene, spotLight);

    const keyboardHandler = new UserInputEventEmitter();
    const collisionDetector = new CollisionDetector(player, scene)
    const manualMotionStrategy = new ManualMotionStrategy(player, collisionDetector, keyboardHandler);
    keyboardHandler.subscribe();

    player.setMotionStrategy(manualMotionStrategy)
    player.setSensor(new EyeSensor(player, scene));

    return player;
}

const createEnemies = (scene: Scene, sceneModel: SceneModel, walls: MeshModel[]) => {
    const enemies = [new Enemy(scene)];

    enemies.forEach(enemy => {
        enemy.setSensor(new HearingSensor(enemy, scene));
        const collisionDetector = new CollisionDetector(enemies[0], scene);
        enemy.setMotionStrategy(new WanderingMotionStrategy(enemies[0], sceneModel, walls, collisionDetector));
    });

    return enemies;
}

const createMeshFactory = (scene: Scene, shadowGenerator: ShadowGenerator) => {
    const wallMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
    return new MeshFactory(scene, wallMaterial, shadowGenerator);
}

const createWalls = (meshFactory: MeshFactory) => {
    return [
        meshFactory.createWall(new VectorModel(-48, 5, 0), new VectorModel(1, 10, 95)),
        meshFactory.createWall(new VectorModel(48, 5, 0), new VectorModel(1, 10, 95)),
        meshFactory.createWall(new VectorModel(0, 5, 48), new VectorModel(95, 10, 1)),
        meshFactory.createWall(new VectorModel(0, 5, -48), new VectorModel(95, 10, 1)),
        meshFactory.createWall(new VectorModel(0, 5, 20), new VectorModel(15, 10, 2)),
        meshFactory.createWall(new VectorModel(-15, 5, -15), new VectorModel(10, 10, 2))
    ]
}

const createCamera = (scene: Scene) => {
    return new BABYLON.ArcRotateCamera('Camera', -Math.PI / 2,  Math.PI / 4, 150, BABYLON.Vector3.Zero(), scene);
};
