import { Mesh, Scene, Skeleton } from '@babylonjs/core';
import { Promise } from 'es6-promise';
import { defaultMeshConfig } from '../../model/core/templates/creators/ModelFileBasedTemplateCreator';
import { VectorModel } from '../../model/core/VectorModel';
import { ModelFileLoader } from '../world_import/ModelFileLoader';
import { DoorFactory } from '../world_items/factories/DoorFactory';
import { EmptyAreaFactory } from '../world_items/empty_area/EmptyAreaFactory';
import { EnemyFactory } from '../world_items/factories/EnemyFactory';
import { FloorFactory } from '../world_items/factories/FloorFactory';
import { RoomFactory } from '../world_items/factories/RoomFactory';
import { WallFactory } from '../world_items/factories/WallFactory';
import { WindowFactory } from '../world_items/factories/WindowFactory';
import { ModelFactory } from './ModelFactory';
import { WorldFactory } from './WorldFactory';
import { WorldItemFactory } from './WorldItemFactory';
import { ModelFactory2 } from '../world_items/factories/ModelFactory2';
import { WorldItemBoundingBoxCalculator } from './WorldItemBoundingBoxCalculator';
import { WorldItemRotationCalculator } from './WorldItemRotationCalculator';
import { PlayerFactory } from '../world_items/factories/PlayerFactory';

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

    private readonly ENEMY_PATH = 'models/enemy/';
    private readonly GHOST_MODEL_FILE = 'ghost.obj';


    private readonly PLAYER_BASE_PATH = 'models/player/';
    private readonly PLAYER_MODEL_FILE = 'player.babylon';
    private readonly PLAYER_MATERIALS = [
        'models/player/material/0.jpg',
        'models/player/material/1.jpg',
        'models/player/material/2.jpg',
        'models/player/material/3.jpg'
    ];

    public getFactory(scene: Scene): Promise<WorldFactory> {

        return this.getMeshTemplateStore(scene)
            .then(meshTemplateStore => {

                const bedFactory = new ModelFactory2(meshTemplateStore.get('bed'));
                const tableFactory = new ModelFactory2(meshTemplateStore.get('table'));
                const cupboardFactory = new ModelFactory2(meshTemplateStore.get('cupboard'));
                const bathtubFactory = new ModelFactory2(meshTemplateStore.get('bathtub'));
                const washbasinFactory = new ModelFactory2(meshTemplateStore.get('washbasin'));
                const emptyAreaFactory = new EmptyAreaFactory(scene);
                const enemyFactory = new EnemyFactory(meshTemplateStore.get('ghost'));
                const playerFactory = new PlayerFactory(meshTemplateStore.get('player'), scene);
                const floorFactory = new FloorFactory(scene);

                const map: Map<string, WorldItemFactory> = new Map();
                map.set('bed', <any> bedFactory);
                map.set('empty', emptyAreaFactory);
                map.set('table', <any> tableFactory);
                map.set('cupboard', <any> cupboardFactory);
                map.set('bathtub', <any> bathtubFactory);
                map.set('washbasin', <any> washbasinFactory);
                map.set('player', playerFactory);
                map.set('floor', floorFactory);

                return new WorldFactory(
                    enemyFactory,
                    map,
                    {
                        wall: new WallFactory(scene),
                        door: new DoorFactory(scene),
                        window: new WindowFactory(scene),
                        room: new RoomFactory(scene)
                    },
                    new WorldItemBoundingBoxCalculator(),
                    new WorldItemRotationCalculator()
                );
            });
    }

    protected getMeshTemplateStore(scene: Scene): Promise<Map<string, [Mesh[], Skeleton[]]>> {

        const modelFileLoader = new ModelFileLoader(scene);

        return Promise.all([
            modelFileLoader.load(
                'ghost',
                this.ENEMY_PATH,
                this.GHOST_MODEL_FILE,
                [],
                {...defaultMeshConfig, scaling: new VectorModel(0.005, 0.005, 0.005)}
            ),
            modelFileLoader.load(
                'player',
                this.PLAYER_BASE_PATH,
                this.PLAYER_MODEL_FILE,
                this.PLAYER_MATERIALS,
                {...defaultMeshConfig, scaling: new VectorModel(0.25, 0.25, 0.25)}
            ),
            modelFileLoader.load(
                'bed',
                this.FURNITURE_1_BASE_PATH,
                this.BED_MODEL_FILE,
                [this.FURNITURE_1_MATERIAL],
                {...defaultMeshConfig, scaling: new VectorModel(0.03, 0.03, 0.03)}
            ),
            modelFileLoader.load(
                'table',
                this.FURITURE_2_BASE_PATH,
                this.TABLE_MODEL_FILE,
                [this.FURNITURE_2_MATERIAL],
                {...defaultMeshConfig, scaling: new VectorModel(0.03, 0.03, 0.03)}
            ),
            modelFileLoader.load(
                'cupboard',
                this.FURITURE_2_BASE_PATH,
                this.CUPBOARD_MODEL_FILE,
                [this.FURNITURE_2_MATERIAL],
                {...defaultMeshConfig, scaling: new VectorModel(0.03, 0.03, 0.03)}
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
        .then((results: [Mesh[], Skeleton[]][]) => {
            const map = new Map<string, [Mesh[], Skeleton[]]>();

            results.forEach(model => map.set(model[0][0].name, model));

            return map;
        });
    }
}

