import { Scene, Mesh, Light, SpotLight, ShadowGenerator, HemisphericLight } from 'babylonjs';
import { WorldMap } from '../game_map_creator/WorldMap';
import { MeshFactory } from '../model/core/MeshFactory';
import { WorldMapGenerator } from '../game_map_creator/WorldMapGenerator';
import { SceneModel } from '../model/core/SceneModel';
import { Rectangle } from 'game-worldmap-generator';
import { GameObjectParser } from 'game-worldmap-generator';
import { LightController } from '../model/light/LightController';
import { Promise } from 'es6-promise';


export const createLevel = (scene: Scene, worldMapStr: string): Promise<WorldMap> => {
    const sceneModel = new SceneModel(scene, new Rectangle(-50, -50, 100, 100));

    createCamera(scene);
    const hemisphericLight = createHemisphericLight(scene);
    const spotLight = <SpotLight> createSpotLight(scene);
    const shadowGenerator = createShadow(scene, spotLight);

    const meshFactory = createMeshFactory(scene, shadowGenerator, spotLight);
    const gameMapCreator = new WorldMapGenerator(new GameObjectParser(), meshFactory, 1);
    return gameMapCreator
        .create(worldMapStr)
        .then(worldMap => {
            worldMap.lightController = new LightController(hemisphericLight);
            return worldMap;
        });
};

const createMeshFactory = (scene: Scene, shadowGenerator: ShadowGenerator, spotLight: SpotLight) => {
    return new MeshFactory(scene, shadowGenerator, spotLight);
};

const createShadow = (scene: Scene, spotLight: SpotLight): ShadowGenerator => {
    const shadowGenerator = new BABYLON.ShadowGenerator(1024, spotLight);
    shadowGenerator.usePoissonSampling = true;

    return shadowGenerator;
};

const createHemisphericLight = (scene: Scene): HemisphericLight => {
    const light = new BABYLON.HemisphericLight('HemiLight', new BABYLON.Vector3(0, 1, 0), scene);
    // light.diffuse = new BABYLON.Color3(0.3, 0.3, 0.3);
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.intensity = 0.01;
    return light;
};

const createSpotLight = (scene: Scene): Light => {
    const spotLight = new BABYLON.SpotLight('spotLight', new BABYLON.Vector3(0, 2, 1), new BABYLON.Vector3(0, 0.5, -5), Math.PI / 8, 1, scene);
    spotLight.diffuse = new BABYLON.Color3(1, 1, 1);

    return spotLight;
};

const createCamera = (scene: Scene) => {
    return new BABYLON.ArcRotateCamera('Camera', -Math.PI / 2,  Math.PI / 4, 150, BABYLON.Vector3.Zero(), scene);
};

