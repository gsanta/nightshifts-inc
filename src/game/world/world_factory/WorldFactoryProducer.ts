import { Mesh, Scene, Skeleton, MeshBuilder } from '@babylonjs/core';
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
import { WorldFactory } from './WorldFactory';
import { WorldItemFactory } from './WorldItemFactory';
import { ModelFactory } from '../world_items/factories/ModelFactory';
import { WorldItemBoundingBoxCalculator } from './WorldItemBoundingBoxCalculator';
import { WorldItemRotationCalculator } from './WorldItemRotationCalculator';
import { PlayerFactory } from '../world_items/factories/PlayerFactory';
import { WindowFactory } from '../world_items/factories/WindowFactory';

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
    private readonly CHAIR_MODEL_FILE = 'chair.babylon';

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

                const map: Map<string, WorldItemFactory> = new Map();
                map.set('bed', <any> new ModelFactory(meshTemplateStore.get('bed'), scene));
                map.set('empty', new EmptyAreaFactory(scene));
                map.set('table', <any> new ModelFactory(meshTemplateStore.get('table'), scene));
                map.set('cupboard', <any> new ModelFactory(meshTemplateStore.get('cupboard'), scene));
                map.set('bathtub', <any> new ModelFactory(meshTemplateStore.get('bathtub'), scene));
                map.set('washbasin', <any> new ModelFactory(meshTemplateStore.get('washbasin'), scene));
                map.set('chair', <any> new ModelFactory(meshTemplateStore.get('chair'), scene));
                map.set('player', <any> new PlayerFactory(meshTemplateStore.get('player'), scene));
                map.set('floor', <any> new FloorFactory(scene));
                map.set('door', <any> new DoorFactory(meshTemplateStore.get('door'), scene, MeshBuilder));
                map.set('window', <any> new WindowFactory(meshTemplateStore.get('window'), scene, MeshBuilder));

                return new WorldFactory(
                    new EnemyFactory(meshTemplateStore.get('ghost')),
                    map,
                    {
                        wall: new WallFactory(scene),
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
                {...defaultMeshConfig, scaling: new VectorModel(0.28, 0.28, 0.28)}
            ),
            modelFileLoader.load(
                'bed',
                this.FURNITURE_1_BASE_PATH,
                this.BED_MODEL_FILE,
                [this.FURNITURE_1_MATERIAL],
                {...defaultMeshConfig, scaling: new VectorModel(0.03, 0.03, 0.03)}
            ),
            modelFileLoader.load(
                'window',
                'models/',
                'window.babylon',
                [],
                {...defaultMeshConfig, scaling: new VectorModel(1, 1, 1)}
            ),
            modelFileLoader.load(
                'door',
                'models/',
                'door.babylon',
                [],
                {...defaultMeshConfig, scaling: new VectorModel(1, 1, 1)}
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
            ),
            modelFileLoader.load(
                'chair',
                this.FURITURE_3_BASE_PATH,
                this.CHAIR_MODEL_FILE,
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

