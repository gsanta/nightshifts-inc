import { World } from '../../World';
import { MeshFactory } from './MeshFactory';
import { MeshModel } from '../MeshModel';
import { Scene, HemisphericLight, Light, Camera, SpotLight, ShadowGenerator } from 'babylonjs';
import { AbstractMeshFactoryProducer } from './AbstractMeshFactoryProducer';
import { Vector2Model } from '../../utils/Vector2Model';


export abstract class AbstractWorldGenerator<T extends {name: string}> {
    protected meshFactory: MeshFactory<T>;
    private shadowGenerator: ShadowGenerator;
    private hemisphericLight: HemisphericLight;
    private spotLight: SpotLight;
    private worldDimensions: Vector2Model;
    private camera: Camera;
    private meshFactoryProducer: AbstractMeshFactoryProducer<T>;
    private scene: Scene;

    constructor(scene: Scene, canvas: HTMLCanvasElement, meshFactoryProducer: AbstractMeshFactoryProducer<T>) {
        this.scene = scene;
        this.meshFactoryProducer = meshFactoryProducer;
        this.spotLight = this.createSpotLight(scene);
        this.hemisphericLight = this.createHemisphericLight(scene);
        this.shadowGenerator = this.createShadowGenerator(scene, this.spotLight);
        this.camera = this.createCamera(scene, canvas);
        this.meshFactory = meshFactory;
    }

    public create(items: T[]): World {
        const worldDimensions = this.getWorldDimensions(items);
        const meshFactory = this.meshFactoryProducer.getFactory(this.scene, worldDimensions, this.shadowGenerator, this.spotLight);
    }

    protected createMesh(meshModelDescription: T, world: World): MeshModel {
        switch (meshModelDescription.name) {
            case 'wall':
                return this.meshFactory.createWall(meshModelDescription, world);
            case 'door':
                return this.meshFactory.createDoor(meshModelDescription, world);
            case 'window':
                return this.meshFactory.createWindow(meshModelDescription, world);
            case 'floor':
                return this.meshFactory.createFloor(meshModelDescription, world);
            case 'player':
                return this.meshFactory.createPlayer(meshModelDescription, world);
            case 'bed':
                return this.meshFactory.createBed(meshModelDescription, world);
            case 'table':
                return this.meshFactory.createTable(meshModelDescription, world);
            case 'cupboard':
                return this.meshFactory.createCupboard(meshModelDescription, world);
            case 'bathtub':
                return this.meshFactory.createBathtub(meshModelDescription, world);
            case 'washbasin':
                return this.meshFactory.createWashbasin(meshModelDescription, world);
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

    protected abstract getWorldDimensions(items: T[]): Vector2Model;

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
        const camera = new BABYLON.ArcRotateCamera('Camera', -Math.PI / 2,  Math.PI / 4, 150, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        return camera;
    }
}
