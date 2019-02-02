import { World } from '../../World';
import { MeshFactory } from './MeshFactory';
import { MeshModel } from '../MeshModel';
import { Scene, HemisphericLight, Light, Camera, SpotLight, ShadowGenerator, FollowCamera } from 'babylonjs';
import { AbstractMeshFactoryProducer } from './AbstractMeshFactoryProducer';
import { Vector2Model } from '../../utils/Vector2Model';
import { Promise } from 'es6-promise';
import { LightController } from '../../light/LightController';


export abstract class AbstractWorldImporter<T extends {name: string}> {
    protected shadowGenerator: ShadowGenerator;
    protected hemisphericLight: HemisphericLight;
    protected spotLight: SpotLight;
    protected meshFactoryProducer: AbstractMeshFactoryProducer<T>;
    protected scene: Scene;
    protected camera: FollowCamera;

    constructor(scene: Scene, canvas: HTMLCanvasElement, meshFactoryProducer: AbstractMeshFactoryProducer<T>) {
        this.scene = scene;
        this.meshFactoryProducer = meshFactoryProducer;
        this.spotLight = this.createSpotLight(scene);
        this.hemisphericLight = this.createHemisphericLight(scene);
        this.shadowGenerator = this.createShadowGenerator(scene, this.spotLight);
        this.camera = <FollowCamera> this.createCamera(scene, canvas);
    }

    public abstract create(strWorld: string): Promise<World>;

    protected abstract setMeshes(meshModelDescription: T[], meshFactory: MeshFactory<T>, world: World): void;

    protected createMesh(meshModelDescription: T, meshFactory: MeshFactory<T>, world: World): MeshModel {
        switch (meshModelDescription.name) {
            case 'wall':
                return meshFactory.createWall(meshModelDescription, world);
            case 'door':
                return meshFactory.createDoor(meshModelDescription, world);
            case 'window':
                return meshFactory.createWindow(meshModelDescription, world);
            case 'floor':
                return meshFactory.createFloor(meshModelDescription, world);
            case 'player':
                return meshFactory.createPlayer(meshModelDescription, world);
            case 'bed':
                return meshFactory.createBed(meshModelDescription, world);
            case 'table':
                return meshFactory.createTable(meshModelDescription, world);
            case 'cupboard':
                return meshFactory.createCupboard(meshModelDescription, world);
            case 'bathtub':
                return meshFactory.createBathtub(meshModelDescription, world);
            case 'washbasin':
                return meshFactory.createWashbasin(meshModelDescription, world);
            default:
                throw new Error('Unknown GameObject type: ' + meshModelDescription.name);
        }
    }

    // const initMeshFactory = (
    //     scene: Scene, shadowGenerator: ShadowGenerator, spotLight: SpotLight, worldDimensions: Vector2Model): Promise<MeshFactory<GameObject>> => {
    //     const meshFactoryProducer = new GwmMeshFactoryProducer();
    //     return meshFactoryProducer.getFactory(scene, worldDimensions, shadowGenerator, spotLight);
    // }

    // private getWorldDimensions(gameObjects: GameObject[]): Vector2Model => {
    //     const floor = gameObjects.filter(gameObject => gameObject.name === 'floor')[0];

    //     return new Vector2Model(floor.dimensions.width, floor.dimensions.height);
    // }

    // protected abstract getWorldDimensions(items: T[]): Vector2Model;

    private createShadowGenerator(scene: Scene, spotLight: SpotLight): ShadowGenerator {
        const shadowGenerator = new BABYLON.ShadowGenerator(1024, spotLight);
        shadowGenerator.usePoissonSampling = true;

        return shadowGenerator;
    }

    private createHemisphericLight(scene: Scene): HemisphericLight {
        const light = new BABYLON.HemisphericLight('HemiLight', new BABYLON.Vector3(0, 1, 0), scene);
        // light.diffuse = new BABYLON.Color3(0.3, 0.3, 0.3);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.intensity = 0.01;
        return light;
    }

    private createSpotLight(scene: Scene): SpotLight {
        const spotLight = new BABYLON.SpotLight('spotLight', new BABYLON.Vector3(0, 2, 1), new BABYLON.Vector3(0, 0.5, -5), Math.PI / 8, 1, scene);
        spotLight.diffuse = new BABYLON.Color3(1, 1, 1);

        return spotLight;
    }

    private createCamera(scene: Scene, canvas: HTMLCanvasElement): Camera {
        const camera = new BABYLON.FollowCamera('camera', new BABYLON.Vector3(0, 120, 0), scene);

        camera.radius = 60;
        camera.heightOffset = 30;
        camera.rotationOffset = 0;
        camera.cameraAcceleration = 0.05;
        camera.maxCameraSpeed = 20;

        return camera;
    }
}
