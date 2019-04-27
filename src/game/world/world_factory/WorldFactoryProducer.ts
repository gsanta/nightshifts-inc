import { TemplateCreator } from '../../model/core/templates/TemplateCreator';
import { Scene, SpotLight, ShadowGenerator, Mesh } from 'babylonjs';
import { WorldFactory } from './WorldFactory';
import { ModelFileBasedTemplateCreator, defaultMeshConfig } from '../../model/core/templates/creators/ModelFileBasedTemplateCreator';
import { AsyncTemplateCreator } from '../../model/core/templates/AsyncTemplateCreator';
import { VectorModel } from '../../model/core/VectorModel';
import { FloorTemplateCreator } from '../../model/core/templates/creators/FloorTemplateCreator';
import { Promise } from 'es6-promise';
import { World } from '../World';
import { ModelFileLoader } from '../world_import/ModelFileLoader';
import { WorldItemToWorldCenterTranslatorDecorator } from '../world_items/world_item_mappers/WorldItemToWorldCenterTranslatorDecorator';
import { WorldItemToRealWorldCoordinateMapper } from '../world_items/world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { WallFactory } from '../world_items/wall/WallFactory';
import { PlayerFactory } from '../world_items/player/PlayerFactory';
import { FloorFactory } from '../world_items/floor/FloorFactory';
import { WindowFactory } from '../world_items/window/WindowFactory';
import { GwmStaticItemImporter } from '../world_items/GwmStaticItemImporter';
import { RoomFactory } from '../world_items/room/RoomFactory';
import { WorldItemFactory } from './WorldItemFactory';
import { ModelFactory } from './ModelFactory';
import { EmptyAreaFactory } from '../world_items/empty_area/EmptyAreaFactory';
import { DoorFactory } from '../world_items/door/DoorFactory';
import { EnemyFactory } from '../world_items/enemy/EnemyFactory';

interface MeshMap<V> {
    player: V;
    floor: V;
    window: V;
}

export class WorldFactoryProducer {

    private readonly FURNITURE_1_MATERIAL = 'models/furniture_1/material/beds.png';
    private readonly FURNITURE_1_BASE_PATH = 'models/furniture_1/';
    private readonly BED_MODEL_FILE = 'bed.babylon';

    private readonly FURNITURE_2_MATERIAL = 'models/furniture_2/material/furniture.png';
    private readonly FURITURE_2_BASE_PATH = 'models/furniture_2/';
    private readonly CUPBOARD_MODEL_FILE = 'cupboard.babylon';
    private readonly TABLE_MODEL_FILE = 'table.babylon';

    private readonly FURNITURE_3_MATERIAL = 'models/furniture_3/material/bathroom.png';
    private readonly FURITURE_3_BASE_PATH = 'models/furniture_3/';
    private readonly BATHTUB_MODEL_FILE = 'bathtub.babylon';
    private readonly WASHBASIN_MODEL_FILE = 'wash_basin.babylon';


    private readonly PLAYER_BASE_PATH = 'models/player/';
    private readonly PLAYER_MODEL_FILE = 'player.babylon';
    private readonly PLAYER_MATERIALS = [
        'models/player/material/0.jpg',
        'models/player/material/1.jpg',
        'models/player/material/2.jpg',
        'models/player/material/3.jpg'
    ];

    public getFactory(scene: Scene, world: World, shadowGenerator: ShadowGenerator, spotLight: SpotLight): Promise<WorldFactory> {
        const gameObjectTranslator = new WorldItemToWorldCenterTranslatorDecorator(1, new WorldItemToRealWorldCoordinateMapper(1));

        return this.getTemplateProducers(scene)
            .then(meshMap => {

                return this.getMeshTemplateStore(scene)
                    .then(meshTemplateStore => {

                        const bedFactory = new ModelFactory(meshTemplateStore.get('bed'), gameObjectTranslator, shadowGenerator);
                        const tableFactory = new ModelFactory(meshTemplateStore.get('table'), gameObjectTranslator, shadowGenerator);
                        const cupboardFactory = new ModelFactory(meshTemplateStore.get('cupboard'), gameObjectTranslator, shadowGenerator);
                        const bathtubFactory = new ModelFactory(meshTemplateStore.get('bathtub'), gameObjectTranslator, shadowGenerator);
                        const washbasinFactory = new ModelFactory(meshTemplateStore.get('washbasin'), gameObjectTranslator, shadowGenerator);
                        const emptyAreaFactory = new EmptyAreaFactory(scene);

                        const map: Map<string, WorldItemFactory> = new Map();
                        map.set('bed', bedFactory);
                        map.set('empty', emptyAreaFactory);
                        map.set('table', tableFactory);
                        map.set('cupboard', cupboardFactory);
                        map.set('bathtub', bathtubFactory);
                        map.set('washbasin', washbasinFactory);

                        return new WorldFactory(
                            new EnemyFactory(scene),
                            map,
                            {
                                wall: new WallFactory(shadowGenerator, scene),
                                door: new DoorFactory(scene, shadowGenerator),
                                player: new PlayerFactory(meshMap.player.create(world), gameObjectTranslator, scene, shadowGenerator, spotLight),
                                floor: new FloorFactory(meshMap.floor.create(world), gameObjectTranslator, shadowGenerator),
                                window: new WindowFactory(scene, shadowGenerator),
                                room: new RoomFactory(scene)
                            }
                        );
                    });
            });
    }

    protected getMeshTemplateStore(scene: Scene): Promise<Map<string, Mesh>> {

        const modelFileLoader = new ModelFileLoader(scene);

        return Promise.all([
            modelFileLoader.load(
                'bed',
                this.FURNITURE_1_BASE_PATH,
                this.BED_MODEL_FILE,
                [this.FURNITURE_1_MATERIAL],
                {...defaultMeshConfig, scaling: new VectorModel(0.04, 0.04, 0.04)}
            ),
            modelFileLoader.load(
                'table',
                this.FURITURE_2_BASE_PATH,
                this.TABLE_MODEL_FILE,
                [this.FURNITURE_2_MATERIAL],
                {...defaultMeshConfig, scaling: new VectorModel(0.04, 0.04, 0.04)}
            ),
            modelFileLoader.load(
                'cupboard',
                this.FURITURE_2_BASE_PATH,
                this.CUPBOARD_MODEL_FILE,
                [this.FURNITURE_2_MATERIAL],
                {...defaultMeshConfig, scaling: new VectorModel(0.04, 0.04, 0.04)}
            ),
            modelFileLoader.load(
                'bathtub',
                this.FURITURE_3_BASE_PATH,
                this.BATHTUB_MODEL_FILE,
                [this.FURNITURE_3_MATERIAL],
                {...defaultMeshConfig, scaling: new VectorModel(3, 3, 3)}
            ),
            modelFileLoader.load(
                'washbasin',
                this.FURITURE_3_BASE_PATH,
                this.WASHBASIN_MODEL_FILE,
                [this.FURNITURE_3_MATERIAL],
                {...defaultMeshConfig, scaling: new VectorModel(3, 3, 3)}
            )
        ])
        .then((meshes: Mesh[]) => {
            const map = new Map<string, Mesh>();

            meshes.forEach(mesh => {
                map.set(mesh.name, mesh);
            });

            return map;
        });
    }

    protected getTemplateProducers(scene: Scene): Promise<MeshMap<TemplateCreator>> {

        const meshMap: MeshMap<TemplateCreator> = {
            player: new ModelFileBasedTemplateCreator(
                scene,
                this.PLAYER_BASE_PATH,
                this.PLAYER_MODEL_FILE,
                this.PLAYER_MATERIALS,
                {...defaultMeshConfig, singleton: true, scaling: new VectorModel(0.3, 0.3, 0.3)}
            ),
            floor: new FloorTemplateCreator(scene),
            window: null
        };

        return Promise.all([
            (<AsyncTemplateCreator> meshMap.player).doAsyncWork()
        ])
        .then(() => meshMap);
    }
}

