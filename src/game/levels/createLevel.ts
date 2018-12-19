import { Scene, Mesh, Light, SpotLight, ShadowGenerator } from 'babylonjs';
import { WorldMap } from '../game_map_creator/WorldMap';
import { MeshFactory } from '../model/core/MeshFactory';
import { WorldMapGenerator } from '../game_map_creator/WorldMapGenerator';
import { SceneModel } from '../model/core/SceneModel';
import { Rectangle } from 'game-worldmap-generator';
import { GameObjectParser } from 'game-worldmap-generator';


export const createLevel = (scene: Scene, worldMapStr: string): WorldMap => {
    const sceneModel = new SceneModel(scene, new Rectangle(-50, -50, 100, 100));

    createCamera(scene);
    createHemisphericLight(scene);
    const spotLight = <SpotLight> createSpotLight(scene);
    const shadowGenerator = createShadow(scene, spotLight);

    const meshFactory = createMeshFactory(scene, shadowGenerator);
    const gameMapCreator = new WorldMapGenerator(new GameObjectParser(), meshFactory, 1);
    const gameMap = gameMapCreator.create(worldMapStr);

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

const createCamera = (scene: Scene) => {
    return new BABYLON.ArcRotateCamera('Camera', -Math.PI / 2,  Math.PI / 4, 150, BABYLON.Vector3.Zero(), scene);
};

