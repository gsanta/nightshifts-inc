import { StandardMaterial, Scene, MeshBuilder, ShadowGenerator, Light, SpotLight, Vector3 } from 'babylonjs';
import { VectorModel } from './VectorModel';
import { MeshModel } from './MeshModel';
import { Player } from '../creature/type/Player';
import { UserInputEventEmitter } from '../creature/motion/UserInputEventEmitter';
import { CollisionDetector } from '../creature/collision/CollisionDetector';
import { ManualMotionStrategy } from '../creature/motion/ManualMotionStrategy';
import { EyeSensor } from '../creature/sensor/EyeSensor';
import { GameConstants } from '../../GameConstants';
import { MultiMeshModel } from './MultiMeshModel';
import { Door } from '../creature/type/Door';
import { ActionStrategy } from '../creature/action/ActionStrategy';
import { WorldMap } from '../../game_map_creator/WorldMap';

const colors = GameConstants.colors;

export class MeshFactory {
    private scene: Scene;
    private shadowGenerator: ShadowGenerator;
    private idCounter = 0;
    private spotLight: SpotLight;
    private materials: {[key: string]: StandardMaterial};

    constructor(scene: Scene, shadowGenerator: ShadowGenerator, spotLight: SpotLight) {
        this.scene = scene;
        this.shadowGenerator = shadowGenerator;
        this.spotLight = spotLight;
        this.shadowGenerator = this.createShadow(this.spotLight);
        this.materials = this.initMaterials();
    }

    public createWall(translate: VectorModel, dimensions: VectorModel): MeshModel {
        const mesh = MeshBuilder.CreateBox(
            'wall-' + this.idCounter++,
            { width: dimensions.x(), depth: dimensions.z(), height: dimensions.y() },
            this.scene
        );

        mesh.checkCollisions = true;
        mesh.isPickable = true;
        mesh.material = this.materials.wall;
        mesh.receiveShadows = true;

        const meshModel = new MeshModel(mesh);
        meshModel.translate(translate);
        meshModel.translate(new VectorModel(0, dimensions.y() / 2, 0));

        const shadowMap = this.shadowGenerator.getShadowMap();
        if (shadowMap && shadowMap.renderList) {
            shadowMap.renderList.push(mesh);
        }

        meshModel.name = 'wall';

        return meshModel;
    }

    public createPlayer(translate: VectorModel, worldMap: WorldMap) {
        const keyboardHandler = new UserInputEventEmitter();

        const player = new Player(this.scene, this.spotLight, translate, keyboardHandler);

        const actionStrategy = new ActionStrategy(player, worldMap);

        const collisionDetector = new CollisionDetector(player, this.scene)
        const manualMotionStrategy = new ManualMotionStrategy(player, collisionDetector, keyboardHandler);
        keyboardHandler.subscribe();

        player.setMotionStrategy(manualMotionStrategy)
        player.setSensor(new EyeSensor(player, this.scene));
        player.setActionStrategy(actionStrategy);

        return player;
    }

    public createWindow(translate: VectorModel, dimensions: VectorModel): MeshModel {
        const bottom = MeshBuilder.CreateBox(
            'window-' + this.idCounter++,
            { width: dimensions.x(), depth: dimensions.z(), height: dimensions.y() / 6 },
            this.scene
        );

        bottom.translate(new Vector3(0, - dimensions.y() / 2 + dimensions.y() / 12, 0), 1);

        bottom.checkCollisions = true;
        bottom.isPickable = true;
        bottom.material = this.materials.wall;
        bottom.receiveShadows = true;

        const middle = MeshBuilder.CreateBox(
            'window-' + this.idCounter++,
            { width: dimensions.x(), depth: dimensions.z(), height: 4 * dimensions.y() / 6 },
            this.scene
        );

        middle.translate(new Vector3(0, 0, 0), 1);

        middle.checkCollisions = true;
        middle.isPickable = true;
        middle.material = this.materials.window;
        middle.receiveShadows = true;

        const top = MeshBuilder.CreateBox(
            'window-' + this.idCounter++,
            { width: dimensions.x(), depth: dimensions.z(), height: dimensions.y() / 6 },
            this.scene
        );

        top.translate(new Vector3(0, dimensions.y() / 2 - dimensions.y() / 12, 0), 1);

        top.checkCollisions = true;
        top.isPickable = true;
        top.material = this.materials.wall;
        top.receiveShadows = true;

        const meshModel = new MultiMeshModel([bottom, middle, top]);
        meshModel.translate(translate);
        meshModel.translate(new VectorModel(0, dimensions.y() / 2, 0));

        const shadowMap = this.shadowGenerator.getShadowMap();
        if (shadowMap && shadowMap.renderList) {
            shadowMap.renderList.push(bottom, middle, top);
        }

        meshModel.name = 'window';

        return meshModel;
    }


    public createDoor(translate: VectorModel, dimensions: VectorModel, pivotPosition?: VectorModel, pivotAngle?: number): MeshModel {
        const mesh = MeshBuilder.CreateBox(
            'door-' + this.idCounter++,
            { width: dimensions.x(), depth: dimensions.z(), height: dimensions.y() },
            this.scene
        );

        mesh.checkCollisions = true;
        mesh.isPickable = true;
        mesh.material = this.materials.door;
        mesh.receiveShadows = true;

        let meshModel: MeshModel;

        if (pivotPosition) {
            meshModel = new Door(mesh, pivotPosition, pivotAngle);
        } else {
            meshModel = new MeshModel(mesh);
        }

        meshModel.translate(translate);
        meshModel.translate(new VectorModel(0, dimensions.y() / 2, 0));

        const shadowMap = this.shadowGenerator.getShadowMap();
        if (shadowMap && shadowMap.renderList) {
            shadowMap.renderList.push(mesh);
        }

        meshModel.name = 'door';

        return meshModel;
    }

    public createFloor(translate: VectorModel, dimensions: VectorModel): MeshModel {
        const ground = BABYLON.MeshBuilder.CreateGround(
            'ground',
            { width: dimensions.x(), height: dimensions.z() },
            this.scene
        );

        ground.receiveShadows = true;
        ground.material = this.materials.floor;

        const meshModel = new MeshModel(ground);
        meshModel.name = 'floor';
        translate.setZ(-2);
        meshModel.translate(translate);

        return meshModel;
    }

    private createShadow(spotLight: SpotLight): ShadowGenerator {
        const shadowGenerator = new BABYLON.ShadowGenerator(1024, spotLight);
        shadowGenerator.usePoissonSampling = true;

        return shadowGenerator;
    }

    private initMaterials(): {[key: string]: StandardMaterial} {
        const doorMaterial = new BABYLON.StandardMaterial('doorMaterial', this.scene);
        doorMaterial.diffuseColor = new BABYLON.Color3(colors.door.r, colors.door.g, colors.door.b);

        const windowMaterial = new BABYLON.StandardMaterial('windowMaterial', this.scene);
        windowMaterial.diffuseColor = BABYLON.Color3.FromHexString(colors.window);

        const wallMaterial = new BABYLON.StandardMaterial('wallMaterial', this.scene);
        wallMaterial.diffuseColor = BABYLON.Color3.FromHexString(colors.wall);
        wallMaterial.emissiveColor = BABYLON.Color3.FromHexString('#111111');


        const floorMaterial = new BABYLON.StandardMaterial('floorMaterial', this.scene);
        floorMaterial.diffuseColor = BABYLON.Color3.FromHexString(colors.floor);
        return {
            door: doorMaterial,
            window: windowMaterial,
            wall: wallMaterial,
            floor: floorMaterial
        };
    }
}
