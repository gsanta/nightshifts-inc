import { FieldMap } from '../model/field_map/FieldMap';
import { Scene, Light, Mesh, ShadowGenerator, SpotLight } from 'babylonjs';
import { Player } from '../model/creature/Player';
import { Enemy } from '../model/creature/Enemy';
import { MeshFactory } from '../model/core/MeshFactory';
import { VectorModel } from '../model/core/VectorModel';
import { FieldMapBuilder } from '../model/field_map/FieldMapBuilder';
import { ManuallyControlledPathFindingStrategy } from '../model/motion/path_finding/ManuallyControlledPathFindingStrategy';
import { AutomaticPathFindingStartegy } from '../model/motion/path_finding/AutomaticPathFindingStrategy';
import { SceneModel, Rectangle } from '../model/core/SceneModel';
import { KeyboardHandler } from '../model/KeyboardHandler';
import { CollisionHandler } from '../model/motion/CollisionHandler';
import { EnemyVisibilityDetector } from '../model/sensor/EnemyVisibilityDetector';

export const createLevel1FieldMap = (scene: Scene): FieldMap => {
    const sceneModel = new SceneModel(scene, new Rectangle(-50, -50, 100, 100));

    createCamera(scene);
    createHemisphericLight(scene);
    const spotLight = <SpotLight> createSpotLight(scene);
    createGround(scene);
    const shadowGenerator = createShadow(scene, spotLight);
    const player = createPlayer(scene, spotLight);
    const enemies = createEnemies(scene);
    const meshFactory = createMeshFactory(scene, shadowGenerator);
    const walls = createWalls(meshFactory);

    const manualPathFindingStrategy = new ManuallyControlledPathFindingStrategy(player);
    const automaticPathFindingStrategy = new AutomaticPathFindingStartegy(enemies[0], sceneModel, walls);
    const keyboardHandler = new KeyboardHandler(manualPathFindingStrategy);
    keyboardHandler.subscribe();

    const collisionHandler = new CollisionHandler(player, scene);
    const enemyCollisionHandler = new CollisionHandler(enemies[0], scene);
    const enemyVisibilityDetector = new EnemyVisibilityDetector(player, scene);

    const fieldMapBuilder = new FieldMapBuilder();
    fieldMapBuilder.addObstacles(walls);
    fieldMapBuilder.addPlayer(player);
    fieldMapBuilder.addEnemies(enemies);
    fieldMapBuilder.addPathFindingStrategy(manualPathFindingStrategy, player);
    fieldMapBuilder.addPathFindingStrategy(automaticPathFindingStrategy, enemies[0]);
    fieldMapBuilder.addCollisionHandler(collisionHandler, player);
    fieldMapBuilder.addCollisionHandler(enemyCollisionHandler, enemies[0]);
    fieldMapBuilder.addVisibilityDetector(enemyVisibilityDetector);

    return fieldMapBuilder.build();
}

const createHemisphericLight = (scene: Scene): Light => {
    var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    light.diffuse = new BABYLON.Color3(0.27, 0.37, 0.41);

    return light;
};

const createSpotLight = (scene: Scene): Light => {
    const spotLight = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(1, 1, 1), new BABYLON.Vector3(0, -1, -5), Math.PI / 4, 1, scene);
    spotLight.diffuse = new BABYLON.Color3(1, 1, 0.6);
    spotLight.specular = new BABYLON.Color3(1, 1, 0.6);

    return spotLight;
};

const createGround = (scene: Scene): Mesh => {
    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
	groundMaterial.diffuseTexture = new BABYLON.Texture("../models/floor_texture.jpg", scene);

    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 100, height: 100}, scene);
    ground.receiveShadows = true;
    ground.material = groundMaterial;

    return ground;
};

const createShadow = (scene: Scene, spotLight: SpotLight): ShadowGenerator => {
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, spotLight);
    shadowGenerator.usePoissonSampling = true;

    return shadowGenerator;
}

const createPlayer = (scene: Scene, spotLight: SpotLight) => {
    return new Player(scene, spotLight);
}

const createEnemies = (scene: Scene) => {
    return [new Enemy(scene)];
}

const createMeshFactory = (scene: Scene, shadowGenerator: ShadowGenerator) => {
    const wallMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
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
    return new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 4, 150, BABYLON.Vector3.Zero(), scene);
}