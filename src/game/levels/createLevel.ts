import { Scene, Mesh, Light, SpotLight, ShadowGenerator } from 'babylonjs';
import { GameMap } from '../game_map_creator/GameMap';
import { MeshFactory } from '../model/core/MeshFactory';
import { GameMapCreator } from '../game_map_creator/GameMapCreator';
import { GameObject } from '../game_object_parser/GameObject';
import { SceneModel } from '../model/core/SceneModel';
import { Rectangle } from 'game-worldmap-generator';


export const createLevel = (scene: Scene, gameObjects: GameObject[]): GameMap => {
    const sceneModel = new SceneModel(scene, new Rectangle(-50, -50, 100, 100));

    createCamera(scene);
    createHemisphericLight(scene);
    const spotLight = <SpotLight> createSpotLight(scene);
    createGround(scene);
    const shadowGenerator = createShadow(scene, spotLight);

    const meshFactory = createMeshFactory(scene, shadowGenerator);
    const gameMapCreator = new GameMapCreator(meshFactory);
    const gameMap = gameMapCreator.create(gameObjects);

    return gameMap;
};

const createMeshFactory = (scene: Scene, shadowGenerator: ShadowGenerator) => {
    const wallMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
    return new MeshFactory(scene, wallMaterial, shadowGenerator);
};

const createShadow = (scene: Scene, spotLight: SpotLight): ShadowGenerator => {
    const shadowGenerator = new BABYLON.ShadowGenerator(1024, spotLight);
    shadowGenerator.usePoissonSampling = true;

    return shadowGenerator;
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

const createCamera = (scene: Scene) => {
    return new BABYLON.ArcRotateCamera('Camera', -Math.PI / 2,  Math.PI / 4, 150, BABYLON.Vector3.Zero(), scene);
};

