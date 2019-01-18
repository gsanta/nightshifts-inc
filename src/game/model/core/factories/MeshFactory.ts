import { StandardMaterial, Scene, MeshBuilder, ShadowGenerator, Light, SpotLight, Vector3, Mesh } from 'babylonjs';
import { VectorModel } from '../VectorModel';
import { MeshModel } from '../MeshModel';
import { Player } from '../../creature/type/Player';
import { UserInputEventEmitter } from '../../creature/motion/UserInputEventEmitter';
import { CollisionDetector } from '../../creature/collision/CollisionDetector';
import { ManualMotionStrategy } from '../../creature/motion/ManualMotionStrategy';
import { EyeSensor } from '../../creature/sensor/EyeSensor';
import { GameConstants } from '../../../GameConstants';
import { MultiMeshModel } from '../MultiMeshModel';
import { Door } from '../../creature/type/Door';
import { Window } from '../../creature/type/Window';
import { ActionStrategy } from '../../creature/action/ActionStrategy';
import { WorldMap } from '../../../game_map_creator/WorldMap';
import { Furniture } from '../../creature/type/Furniture';
import { Promise } from 'es6-promise';
import { Orientation } from '../../utils/Orientation';
import { ModelFileBasedTemplateCreator, defaultMeshConfig } from '../templates/creators/ModelFileBasedTemplateCreator';
import { MeshTemplate } from '../templates/MeshTemplate';
import { GameObjectTranslator } from '../../../game_map_creator/GameObjectToRealWorldCoordinateWrapper';
import { GameObject } from 'game-worldmap-generator';
import { Vector2Model } from '../../utils/Vector2Model';
import { ItemFactory } from './ItemFactory';

const colors = GameConstants.colors;

export class MeshFactory {
    private scene: Scene;
    private factories: {[key: string]: ItemFactory};

    constructor(scene: Scene, factories: {[key: string]: ItemFactory}) {
        this.scene = scene;
        this.factories = factories;
    }

    public createWall(gameObject: GameObject): Promise<MeshModel> {
        return Promise.resolve(this.factories.wall.createItem(gameObject));
    }

    public createPlayer(gameObject: GameObject, worldMap: WorldMap): Promise<MeshModel> {
        const player = <Player> this.factories.player.createItem(gameObject, worldMap);

        return Promise.resolve(player);

        // const keyboardHandler = new UserInputEventEmitter();

        // const player = new Player(this.scene, this.spotLight, translate, keyboardHandler);

        // const actionStrategy = new ActionStrategy(player, worldMap);

        // const collisionDetector = new CollisionDetector(player, this.scene)
        // const manualMotionStrategy = new ManualMotionStrategy(player, collisionDetector, keyboardHandler);
        // keyboardHandler.subscribe();

        // player.setMotionStrategy(manualMotionStrategy)
        // player.setSensor(new EyeSensor(player, this.scene));
        // player.setActionStrategy(actionStrategy);

        // return Promise.resolve(player);
    }

    public createWindow(gameObject: GameObject): Promise<MeshModel> {
        const window = this.factories.window.createItem(gameObject);

        return Promise.resolve(window);
        // const bottom = MeshBuilder.CreateBox(
        //     'window-' + this.idCounter++,
        //     { width: dimensions.x(), depth: dimensions.z(), height: dimensions.y() / 6 },
        //     this.scene
        // );

        // bottom.translate(new Vector3(0, - dimensions.y() / 2 + dimensions.y() / 12, 0), 1);

        // bottom.checkCollisions = true;
        // bottom.isPickable = true;
        // bottom.material = this.materialTemplates.wall;
        // bottom.receiveShadows = true;

        // const isHorizontal = dimensions.x() > dimensions.y();

        // let [middle1, middle2] = isHorizontal ? this.createHorizontalWindowMeshes(dimensions) : this.createVerticalWindowMeshes(dimensions);

        // const top = MeshBuilder.CreateBox(
        //     'window-' + this.idCounter++,
        //     { width: dimensions.x(), depth: dimensions.z(), height: dimensions.y() / 6 },
        //     this.scene
        // );

        // top.translate(new Vector3(0, dimensions.y() / 2 - dimensions.y() / 12, 0), 1);

        // top.checkCollisions = true;
        // top.isPickable = true;
        // top.material = this.materialTemplates.wall;
        // top.receiveShadows = true;

        // let meshModel: MeshModel;

        // if (pivotPosition1) {
        //     meshModel = new Window([bottom, middle1, middle2, top], pivotPosition1, pivotPosition2, pivotAngle);
        // } else {
        //     meshModel = new MultiMeshModel([bottom, middle1, middle2, top]);
        // }


        // meshModel.translate(translate);
        // meshModel.translate(new VectorModel(0, dimensions.y() / 2, 0));

        // const shadowMap = this.shadowGenerator.getShadowMap();
        // if (shadowMap && shadowMap.renderList) {
        //     shadowMap.renderList.push(bottom, middle1, middle2, top);
        // }

        // meshModel.name = 'window';

        // return Promise.resolve(meshModel);

        return Promise.resolve(null);
    }

    // private createHorizontalWindowMeshes(dimensions: VectorModel) {
    //     const middle1 = MeshBuilder.CreateBox(
    //         'window-' + this.idCounter++,
    //         { width: dimensions.x() / 2, depth: dimensions.z(), height: 4 * dimensions.y() / 6 },
    //         this.scene
    //     );

    //     middle1.translate(new Vector3(- dimensions.x() / 4, 0, 0), 1);

    //     middle1.checkCollisions = true;
    //     middle1.isPickable = true;
    //     middle1.material = this.materialTemplates.window;
    //     middle1.receiveShadows = true;

    //     const middle2 = MeshBuilder.CreateBox(
    //         'window-' + this.idCounter++,
    //         { width: dimensions.x() / 2, depth: dimensions.z(), height: 4 * dimensions.y() / 6 },
    //         this.scene
    //     );

    //     middle2.translate(new Vector3(+ dimensions.x() / 4, 0, 0), 1);

    //     middle2.checkCollisions = true;
    //     middle2.isPickable = true;
    //     middle2.material = this.materialTemplates.window;
    //     middle2.receiveShadows = true;

    //     return [middle1, middle2];
    // }

    // private createVerticalWindowMeshes(dimensions: VectorModel) {
    //     const middle1 = MeshBuilder.CreateBox(
    //         'window-' + this.idCounter++,
    //         { width: dimensions.x(), depth: dimensions.z() / 2, height: 4 * dimensions.y() / 6 },
    //         this.scene
    //     );

    //     middle1.translate(new Vector3(0, 0, dimensions.z() / 4), 1);

    //     middle1.checkCollisions = true;
    //     middle1.isPickable = true;
    //     middle1.material = this.materialTemplates.window;
    //     middle1.receiveShadows = true;

    //     const middle2 = MeshBuilder.CreateBox(
    //         'window-' + this.idCounter++,
    //         { width: dimensions.x(), depth: dimensions.z() / 2, height: 4 * dimensions.y() / 6 },
    //         this.scene
    //     );

    //     middle2.translate(new Vector3(0, 0, -dimensions.z() / 4), 1);

    //     middle2.checkCollisions = true;
    //     middle2.isPickable = true;
    //     middle2.material = this.materialTemplates.window;
    //     middle2.receiveShadows = true;

    //     return [middle1, middle2];
    // }


    public createDoor(gameObject: GameObject): Promise<MeshModel> {
        return Promise.resolve(this.factories.door.createItem(gameObject));
    }

    public createFloor(gameObject: GameObject): Promise<MeshModel> {
        return Promise.resolve(this.factories.floor.createItem(gameObject));
        // const ground = BABYLON.MeshBuilder.CreateGround(
        //     'ground',
        //     { width: dimensions.x(), height: dimensions.z() },
        //     this.scene
        // );

        // ground.receiveShadows = true;
        // ground.material = this.materialTemplates.floor;

        // const meshModel = new MeshModel(ground);
        // meshModel.name = 'floor';
        // translate.addZ(-2);
        // meshModel.translate(translate);

        // return Promise.resolve(meshModel);
    }

    public createBed(translate: VectorModel): Promise<MeshModel> {
        // const bed = Furniture.createBed(this.scene, translate, this.modelTemplates.bed)
        // this.addToShadowMap(bed);
        // return Promise.resolve(bed);

        return Promise.resolve(null);
    }

    public createTableWide(translate: VectorModel): Promise<MeshModel> {
        // const table = Furniture.createTableWide(this.scene, translate, this.modelTemplates.tableWide)
        // this.addToShadowMap(table);

        // return Promise.resolve(table);

        return Promise.resolve(null);
    }

    public createTable(gameObject: GameObject): Promise<MeshModel> {
        return Promise.resolve(this.factories.table.createItem(gameObject));
        // const table = Furniture.createTable(this.scene, translate, this.modelTemplates.table)
        // this.addToShadowMap(table);

        // return Promise.resolve(table);

        return Promise.resolve(null);
    }

    public createCupboard(gameObject: GameObject): Promise<MeshModel> {
        return Promise.resolve(this.factories.cupboard.createItem(gameObject));
        // const cupboardMesh = this.modelTemplates.cupboard.getMeshes()[0];
        // const translate = this.gameObjectTranslator.getTranslate(gameObject, this.getMeshDimensions(cupboardMesh)).toVector3();
        // const cupboard = Furniture.createCupboard(this.scene, translate, this.modelTemplates.cupboard, gameObject.additionalData.orientation);
        // this.addToShadowMap(cupboard);

        // return Promise.resolve(cupboard);

        return Promise.resolve(null);
    }

    public createCupboardWithShelves(translate: VectorModel, orientation: Orientation): Promise<MeshModel> {
        // const cupboardWithShelves = Furniture
        //     .createCupboardWithShelves(this.scene, translate, this.modelTemplates.cupboardWithShelves, orientation);
        // this.addToShadowMap(cupboardWithShelves);

        // return Promise.resolve(cupboardWithShelves);

        return Promise.resolve(null);
    }

    // private addToShadowMap(meshModel: MeshModel) {
    //     const shadowMap = this.shadowGenerator.getShadowMap();
    //     if (shadowMap && shadowMap.renderList) {
    //         shadowMap.renderList.push(meshModel.mesh);
    //     }
    // }

    // private getMeshDimensions(mesh: Mesh): Vector2Model {
    //     const boundingBox = mesh.getBoundingInfo().boundingBox;
    //     const width = Math.abs(boundingBox.maximum.x - boundingBox.minimum.x) * mesh.scaling.x;
    //     const depth = Math.abs(boundingBox.maximum.y - boundingBox.minimum.y) * mesh.scaling.y;

    //     return new Vector2Model(width, depth);
    // }
}
