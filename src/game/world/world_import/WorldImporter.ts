import { World } from '../World';
import { WorldFactory } from '../world_factory/WorldFactory';
import { Scene, HemisphericLight, Camera, SpotLight, ShadowGenerator, FollowCamera, StandardMaterial } from 'babylonjs';
import { Promise } from 'es6-promise';
import { GwmWorldItem, TreeIteratorGenerator, TreeNode, defaultParseOptions, GwmWorldMapParser, generators } from 'game-worldmap-generator';
import { Player } from '../world_items/player/Player';
import { WorldItem } from '../world_items/WorldItem';
import { WorldItemTreeMapper } from './WorldItemTreeMapper';
import { ThermometerToolMesh } from '../../tools/ThermometerToolMesh';
import { FlashlightToolMesh } from '../../tools/FlashlightToolMesh';
import { GameConstants } from '../../GameConstants';
import { Room } from '../world_items/room/Room';
import { parseJsonAdditionalData } from './AdditionalData';
import { WorldMapToMatrixGraphConverter } from 'game-worldmap-generator/build/matrix_graph/conversion/WorldMapToMatrixGraphConverter';
import { Vector2Model } from '../../model/utils/Vector2Model';
import { WorldFactoryProducer } from '../world_factory/WorldFactoryProducer';
const colors = GameConstants.colors;

export class WorldImporter {
    protected hemisphericLight: HemisphericLight;
    protected meshFactoryProducer: WorldFactoryProducer;
    protected scene: Scene;
    protected camera: FollowCamera;

    constructor(scene: Scene, canvas: HTMLCanvasElement, meshFactoryProducer: WorldFactoryProducer) {
        this.scene = scene;
        this.meshFactoryProducer = meshFactoryProducer;
        this.hemisphericLight = this.createHemisphericLight(scene);
        this.camera = <FollowCamera> this.createCamera(scene, canvas);
    }

    protected createMesh(meshModelDescription: GwmWorldItem, meshFactory: WorldFactory, world: World): WorldItem {
        switch (meshModelDescription.name) {
            case 'wall':
                return meshFactory.createWall(meshModelDescription, world);
            case 'door':
                return meshFactory.createDoor(meshModelDescription, world);
            case 'window':
                return meshFactory.createWindow(meshModelDescription, world);
            case 'root':
                return meshFactory.createFloor(meshModelDescription, world);
            case 'player':
                return meshFactory.createPlayer(meshModelDescription, world);
            case 'bed':
                return meshFactory.createBed(<any> meshModelDescription, world);
            case 'table':
                return meshFactory.createTable(meshModelDescription, world);
            case 'cupboard':
                return meshFactory.createCupboard(meshModelDescription, world);
            case 'bathtub':
                return meshFactory.createBathtub(meshModelDescription, world);
            case 'washbasin':
                return meshFactory.createWashbasin(meshModelDescription, world);
            case 'room':
                return meshFactory.createRoom(meshModelDescription, world);
            case 'empty':
                return meshFactory.createEmptyArea(meshModelDescription, world);
            default:
                throw new Error('Unknown GameObject type: ' + meshModelDescription.name);
        }
    }

    //TODO: should produce world directly, not getting it through parameter
    protected createWorld(rootWorldItem: GwmWorldItem, worldFactory: WorldFactory): World {
        let world = new World();

        world.dimensions = new Vector2Model(rootWorldItem.dimensions.width, rootWorldItem.dimensions.height);
        world.camera = this.camera;

        world.factory = worldFactory;
        world.scene = this.scene;
        world.hemisphericLight = this.hemisphericLight;

        world.materials = this.createMaterials(this.scene);

        const worldItemToTreeMapper = new WorldItemTreeMapper();

        const treeIterator = TreeIteratorGenerator(rootWorldItem as any);

        const worldItems: WorldItem[] = [];
        const map: Map<TreeNode, any> = new Map();
        for (const gwmWorldItem of treeIterator) {
            const worldItem = this.createMesh(gwmWorldItem, worldFactory, world);
            worldItems.push(worldItem);
            map.set(gwmWorldItem, worldItem);
        }

        worldItemToTreeMapper.mapTree(<any> rootWorldItem, map);
        // const meshes = worldItems.map(worldItem => this.createMesh(worldItem, this.meshFactory, world));

        worldItems.filter(mesh => mesh.name === 'room').forEach((room: Room) => room.state.activate(room));

        world.worldItems = worldItems;
        world.floor = worldItems.filter(mesh => mesh.name === 'floor')[0];
        world.player = <Player> worldItems.filter(mesh => mesh.name === 'player')[0];

        world.tools = [
            new ThermometerToolMesh(this.scene, world.player),
            new FlashlightToolMesh(this.scene, world.player)
        ];

        return world;
    }

    private createHemisphericLight(scene: Scene): HemisphericLight {
        const light = new BABYLON.HemisphericLight('HemiLight', new BABYLON.Vector3(0, 1, 0), scene);
        // light.diffuse = new BABYLON.Color3(0.3, 0.3, 0.3);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.intensity = 1;
        return light;
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

    private createMaterials(scene: Scene): {[key: string]: StandardMaterial} {
        const doorMaterial = new BABYLON.StandardMaterial('door-material', scene);
        doorMaterial.diffuseColor = BABYLON.Color3.FromHexString(colors.door);

        const doorClosedMaterial = new BABYLON.StandardMaterial('door-closed-material', scene);
        doorClosedMaterial.diffuseColor = BABYLON.Color3.FromHexString(colors.doorClosed);

        return {
            door: doorMaterial,
            doorClosed: doorClosedMaterial
        };
    }

    public import(strWorld: string): Promise<World> {

        const options = {...defaultParseOptions, ...{yScale: 2, additionalDataConverter: parseJsonAdditionalData}};
        const furnitureCharacters = ['X', 'C', 'T', 'B', 'S', 'E'];
        const roomSeparatorCharacters = ['W', 'D', 'I'];

        const worldItems = GwmWorldMapParser.createWithCustomWorldItemGenerator(
            new generators.AdditionalDataConvertingWorldItemDecorator(
                new generators.StretchRoomsSoTheyJoinWorldItemGeneratorDecorator(
                    new generators.BorderItemAddingWorldItemGeneratorDecorator(
                        new generators.HierarchyBuildingWorldItemGeneratorDecorator(
                            new generators.BorderItemSegmentingWorldItemGeneratorDecorator(
                                new generators.ScalingWorldItemGeneratorDecorator(
                                    new generators.CombinedWorldItemGenerator(
                                        [
                                            new generators.FurnitureInfoGenerator(furnitureCharacters, new WorldMapToMatrixGraphConverter()),
                                            new generators.RoomSeparatorGenerator(roomSeparatorCharacters),
                                            new generators.RoomInfoGenerator(),
                                            new generators.PolygonAreaInfoGenerator('empty', '#'),
                                            new generators.RootWorldItemGenerator()
                                        ]
                                    ),
                                    { x: options.xScale, y: options.yScale }
                                ),
                                ['wall', 'door', 'window'],
                                { xScale: options.xScale, yScale: options.yScale }
                            )
                        ),
                        ['wall', 'door', 'window'],
                        { xScale: options.xScale, yScale: options.yScale }
                    ),
                    { xScale: options.xScale, yScale: options.yScale }
                ),
                options.additionalDataConverter
            )
        )
        .parse(strWorld);

        return this.meshFactoryProducer.getFactory(this.scene).then(worldFactory => this.createWorld(worldItems[0], worldFactory));
    }
}
