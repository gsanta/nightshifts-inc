import { Scene, Light, SpotLight, ShadowGenerator, HemisphericLight } from 'babylonjs';
import { WorldMap } from '../io/gwm_world_serializer/WorldMap';
import { WorldMapGenerator } from '../io/gwm_world_serializer/WorldMapGenerator';
import { GameObject } from 'game-worldmap-generator';
import { GameObjectParser } from 'game-worldmap-generator';
import { LightController } from '../model/light/LightController';
import { Vector2Model } from '../model/utils/Vector2Model';
import { parseJsonAdditionalData, AdditionalData } from '../io/gwm_world_serializer/AdditionalData';
import { Promise } from 'es6-promise';
import { MeshFactoryProducer } from '../io/gwm_world_serializer/deserializer/factories/MeshFactoryProducer';
import { MeshFactory } from '../model/core/factories/MeshFactory';

export const createLevel = (canvas: HTMLCanvasElement, scene: Scene, worldMapStr: string): Promise<WorldMap> => {
    createCamera(scene, canvas);
    const hemisphericLight = createHemisphericLight(scene);
    const spotLight = <SpotLight> createSpotLight(scene);
    const shadowGenerator = createShadow(scene, spotLight);

    const gameObjects = <GameObject<AdditionalData>[]> new GameObjectParser().parse<AdditionalData>(worldMapStr, parseJsonAdditionalData);

    const worldMap = new WorldMap();

    return initMeshFactory(scene, shadowGenerator, spotLight, getWorldDimensions(gameObjects))
        .then(meshFactory => {
            new WorldMapGenerator(meshFactory, 1).create(gameObjects);

            worldMap.lightController = new LightController(hemisphericLight);
            return worldMap;
        });
};

const initMeshFactory = (
    scene: Scene, shadowGenerator: ShadowGenerator, spotLight: SpotLight, worldDimensions: Vector2Model): Promise<MeshFactory<GameObject>> => {
    const meshFactoryProducer = new MeshFactoryProducer();
    return meshFactoryProducer.getFactory(scene, worldDimensions, shadowGenerator, spotLight);
    // const materialTemplates = MeshFactory.initMaterials(scene);
    // const modelTemplatesPromise = MeshFactory.importModels(scene, materialTemplates);

    // const gameObjectTranslator = new GameObjectToWorldCenterTranslatorDecorator(
    //     new Vector2Model(worldDimensions.x(), worldDimensions.y()),
    //     1,
    //     new GameObjectToRealWorldCoordinateWrapper(worldDimensions, 1)
    // );

    // const wallFactory = new WallFactory(
    //     new WallTemplateCreator(scene).create(),
    //     gameObjectTranslator,
    //     shadowGenerator
    // );

    // const doorFactory = new DoorFactory(
    //     new DoorTemplateCreator(scene).create(),
    //     gameObjectTranslator,
    //     shadowGenerator,
    //     1
    // );

    // return modelTemplatesPromise.then(modelTemplates => new MeshFactory(
    //         scene,
    //         {
    //             wall: new WallFactory(modelTemplates.wall, gameObjectTranslator, shadowGenerator),
    //             door: new DoorFactory(modelTemplates.door, gameObjectTranslator, shadowGenerator, 1)
    //         }
    //     )
    // );
};

const getWorldDimensions = (gameObjects: GameObject[]): Vector2Model => {
    const floor = gameObjects.filter(gameObject => gameObject.name === 'floor')[0];

    return new Vector2Model(floor.dimensions.width, floor.dimensions.height);
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

const createCamera = (scene: Scene, canvas: HTMLCanvasElement) => {
    const camera = new BABYLON.ArcRotateCamera('Camera', -Math.PI / 2,  Math.PI / 4, 150, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    return camera;
};

