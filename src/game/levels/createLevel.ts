import { Scene, Mesh, Light, SpotLight, ShadowGenerator, HemisphericLight } from 'babylonjs';
import { WorldMap } from '../game_map_creator/WorldMap';
import { MeshFactory } from '../model/core/MeshFactory';
import { WorldMapGenerator } from '../game_map_creator/WorldMapGenerator';
import { SceneModel } from '../model/core/SceneModel';
import { Rectangle, GameObject } from 'game-worldmap-generator';
import { GameObjectParser } from 'game-worldmap-generator';
import { LightController } from '../model/light/LightController';
import { Promise } from 'es6-promise';
import { GameObjectToWorldCenterTranslatorDecorator } from '../game_map_creator/GameObjectToWorldCenterTranslatorDecorator';
import { Vector2Model } from '../model/utils/Vector2Model';
import { GameObjectToRealWorldCoordinateWrapper } from '../game_map_creator/GameObjectToRealWorldCoordinateWrapper';


export const createLevel = (canvas: HTMLCanvasElement, scene: Scene, worldMapStr: string): Promise<WorldMap> => {
    createCamera(scene, canvas);
    const hemisphericLight = createHemisphericLight(scene);
    const spotLight = <SpotLight> createSpotLight(scene);
    const shadowGenerator = createShadow(scene, spotLight);

    const gameObjects = new GameObjectParser().parse(worldMapStr);

    return initMeshFactory(scene, shadowGenerator, spotLight, getWorldDimensions(gameObjects))
        .then(meshFactory => new WorldMapGenerator(meshFactory, 1).create(gameObjects))
        .then(worldMap => {
            worldMap.lightController = new LightController(hemisphericLight);
            return worldMap;
        });
};

const initMeshFactory = (scene: Scene, shadowGenerator: ShadowGenerator, spotLight: SpotLight, worldDimensions: Vector2Model): Promise<MeshFactory> => {
    const materialTemplates = MeshFactory.initMaterials(scene);
    const modelTemplatesPromise = MeshFactory.importModels(scene, materialTemplates);

    const gameObjectTranslator = new GameObjectToWorldCenterTranslatorDecorator(
        new Vector2Model(worldDimensions.x(), worldDimensions.y()),
        this.gameObjectToMeshSizeRatio,
        new GameObjectToRealWorldCoordinateWrapper(worldDimensions, this.gameObjectToMeshSizeRatio)
    );

    return modelTemplatesPromise.then(modelTemplates => new MeshFactory(
            scene, 
            {
                shadowGenerator,
                spotLight
            },
            {
                material: materialTemplates, 
                model: modelTemplates
            },
            gameObjectTranslator
        )
    );
};

const getWorldDimensions = (gameObjects: GameObject[]): Vector2Model => {
    const floor = gameObjects.filter(gameObject => gameObject.name === 'floor')[0];

    return new Vector2Model(floor.dimensions.width, floor.dimensions.height)
}

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

const createCamera = (scene: Scene, canvas: HTMLCanvasElement) => {
    const camera = new BABYLON.ArcRotateCamera('Camera', -Math.PI / 2,  Math.PI / 4, 150, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    return camera;
};

