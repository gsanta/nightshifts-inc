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
import { LightController } from '../../actions/handlers/LightController';
import { Vector2Model } from '../../model/utils/Vector2Model';
import { WorldFactoryProducer } from '../world_factory/WorldFactoryProducer';
const colors = GameConstants.colors;

export class WorldImporter {
    protected shadowGenerator: ShadowGenerator;
    protected hemisphericLight: HemisphericLight;
    protected nightLight: HemisphericLight;
    protected spotLight: SpotLight;
    protected meshFactoryProducer: WorldFactoryProducer;
    protected meshFactory: WorldFactory;
    protected scene: Scene;
    protected camera: FollowCamera;

    constructor(scene: Scene, canvas: HTMLCanvasElement, meshFactoryProducer: WorldFactoryProducer) {
        this.scene = scene;
        this.meshFactoryProducer = meshFactoryProducer;
        this.spotLight = this.createSpotLight(scene);
        this.hemisphericLight = this.createHemisphericLight(scene);
        this.nightLight = this.createNightLight(scene);
        this.shadowGenerator = this.createShadowGenerator(scene, this.spotLight);
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

    private createShadowGenerator(scene: Scene, spotLight: SpotLight): ShadowGenerator {
        const shadowGenerator = new BABYLON.ShadowGenerator(1024, spotLight);
        shadowGenerator.usePoissonSampling = true;

        return shadowGenerator;
    }

    //TODO: should produce world directly, not getting it through parameter
    protected createWorld(rootWorldItem: GwmWorldItem, world: World): World {
        world.hemisphericLight = this.hemisphericLight;
        world.nightLight = this.nightLight;
        world.spotLight = this.spotLight;

        world.materials = this.createMaterials(this.scene);

        const fromToMap: Map<GwmWorldItem, WorldItem> = new Map();
        const worldItemToTreeMapper = new WorldItemTreeMapper();

        const treeIterator = TreeIteratorGenerator(rootWorldItem as any);

        const worldItems: WorldItem[] = [];
        const map: Map<TreeNode, any> = new Map();
        for (const gwmWorldItem of treeIterator) {
            const worldItem = this.createMesh(gwmWorldItem, this.meshFactory, world);
            worldItems.push(worldItem);
            map.set(gwmWorldItem, worldItem);
        }

        worldItemToTreeMapper.mapTree(<any> rootWorldItem, map);
        // const meshes = worldItems.map(worldItem => this.createMesh(worldItem, this.meshFactory, world));

        worldItems.filter(mesh => mesh.name === 'room').forEach((room: Room) => room.state.activate(room));

        world.gameObjects = worldItems;
        world.floor = worldItems.filter(mesh => mesh.name === 'floor')[0];
        world.player = <Player> worldItems.filter(mesh => mesh.name === 'player')[0];

        world.tools = [
            new ThermometerToolMesh(this.scene, world.player),
            new FlashlightToolMesh(world.spotLight)
        ];

        return world;
    }

    private createHemisphericLight(scene: Scene): HemisphericLight {
        const light = new BABYLON.HemisphericLight('HemiLight', new BABYLON.Vector3(0, 1, 0), scene);
        // light.diffuse = new BABYLON.Color3(0.3, 0.3, 0.3);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.intensity = 0.4;
        return light;
    }

    private createNightLight(scene: Scene): HemisphericLight {
        const light = new BABYLON.HemisphericLight('NightLight', new BABYLON.Vector3(0, 1, 0), scene);
        // light.diffuse = new BABYLON.Color3(0.3, 0.3, 0.3);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.intensity = 0.1;
        light.setEnabled(false);
        return light;
    }

    private createSpotLight(scene: Scene): SpotLight {
        const spotLight = new BABYLON.SpotLight('spotLight', new BABYLON.Vector3(0, 7, 1), new BABYLON.Vector3(0, 0, -5), Math.PI / 4, 3, scene);
        spotLight.diffuse = new BABYLON.Color3(1, 1, 1);
        spotLight.setEnabled(false);
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

    public create(strWorld: string): Promise<World> {

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


        let world = new World();

        world.lightController = new LightController(this.hemisphericLight);
        world.dimensions = new Vector2Model(worldItems[0].dimensions.width, worldItems[0].dimensions.height);
        world.camera = this.camera;

        return this.meshFactoryProducer.getFactory(this.scene, world, this.shadowGenerator, this.spotLight)
            .then(meshFactory => {

                this.meshFactory = meshFactory;

                world = this.createWorld(worldItems[0], world);

                // world.rooms = [this.createRoom(rooms[0], world, meshFactory)];

                // world.rooms = rooms.map(polygon => this.createRoom(polygon, world, meshFactory));
                return world;
            });
    }

    protected setMeshes(worldItems: GwmWorldItem[], meshFactory: WorldFactory, world: World): void {
        const meshes = worldItems.map(worldItem => this.createMesh(worldItem, meshFactory, world));

        world.gameObjects = meshes;
        world.floor = meshes.filter(mesh => mesh.name === 'floor')[0];
        world.player = <Player> meshes.filter(mesh => mesh.name === 'player')[0];
    }
}
