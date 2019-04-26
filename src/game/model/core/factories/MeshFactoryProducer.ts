import { TemplateCreator } from '../templates/TemplateCreator';
import { Scene, SpotLight, ShadowGenerator, Mesh } from 'babylonjs';
import { MeshFactory } from './MeshFactory';
import { WallTemplateCreator } from '../templates/creators/WallTemplateCreator';
import { DoorTemplateCreator } from '../templates/creators/DoorTemplateCreator';
import { ModelFileBasedTemplateCreator, defaultMeshConfig } from '../templates/creators/ModelFileBasedTemplateCreator';
import { AsyncTemplateCreator } from '../templates/AsyncTemplateCreator';
import { VectorModel } from '../VectorModel';
import { FloorTemplateCreator } from '../templates/creators/FloorTemplateCreator';
import { Promise } from 'es6-promise';
import { World } from '../../World';
import { ModelFileLoader } from './ModelFileLoader';
import { WorldItemToWorldCenterTranslatorDecorator } from '../../../io/gwm_world_io/import/factories/world_item_mappers/WorldItemToWorldCenterTranslatorDecorator';
import { WorldItemToRealWorldCoordinateMapper } from '../../../io/gwm_world_io/import/factories/world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { GwmWallImporter } from '../../../io/gwm_world_io/import/factories/GwmWallImporter';
import { GwmDoorImporter } from '../../../io/gwm_world_io/import/factories/GwmDoorImporter';
import { GwmPlayerImporter } from '../../../io/gwm_world_io/import/factories/GwmPlayerImporter';
import { GwmFloorImporter } from '../../../io/gwm_world_io/import/factories/GwmFloorImporter';
import { GwmWindowImporter } from '../../../io/gwm_world_io/import/factories/GwmWindowImporter';
import { GwmStaticItemImporter } from '../../../io/gwm_world_io/import/factories/GwmStaticItemImporter';
import { GwmRoomImporter } from '../../../io/gwm_world_io/import/factories/GwmRoomImporter';
import { WorldItemFactory } from './WorldItemFactory';
import { ModelFactory } from '../../../io/gwm_world_io/import/factories/ModelFactory';
import { EmptyAreaFactory } from '../../../io/gwm_world_io/import/factories/EmptyAreaFactory';

interface MeshMap<V> {
    wall: WallTemplateCreator;
    door: DoorTemplateCreator;
    player: V;
    cupboard: V;
    table: V;
    floor: V;
    window: V;
    bathtub: V;
    washbasin: V;
    bed: V;
}

export class MeshFactoryProducer {

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

    public getFactory(scene: Scene, world: World, shadowGenerator: ShadowGenerator, spotLight: SpotLight): Promise<MeshFactory> {
        const gameObjectTranslator = new WorldItemToWorldCenterTranslatorDecorator(1, new WorldItemToRealWorldCoordinateMapper(1));

        return this.getTemplateProducers(scene)
            .then(meshMap => {

                return this.getMeshTemplateStore(scene)
                    .then(meshTemplateStore => {

                        const bedFactory = new ModelFactory(meshTemplateStore.get('bed'), gameObjectTranslator, shadowGenerator);
                        const tableFactory = new ModelFactory(meshTemplateStore.get('table'), gameObjectTranslator, shadowGenerator);
                        const emptyAreaFactory = new EmptyAreaFactory(scene);

                        const map: Map<string, WorldItemFactory> = new Map();
                        map.set('bed', bedFactory);
                        map.set('empty', emptyAreaFactory);
                        map.set('table', tableFactory);

                        return new MeshFactory(
                            map,
                            {
                                wall: new GwmWallImporter(shadowGenerator, scene),
                                door: new GwmDoorImporter(scene, shadowGenerator),
                                player: new GwmPlayerImporter(meshMap.player.create(world), gameObjectTranslator, scene, shadowGenerator, spotLight),
                                floor: new GwmFloorImporter(meshMap.floor.create(world), gameObjectTranslator, shadowGenerator),
                                window: new GwmWindowImporter(scene, shadowGenerator),
                                cupboard: new GwmStaticItemImporter(meshMap.cupboard.create(world), gameObjectTranslator, shadowGenerator),
                                table: new GwmStaticItemImporter(meshMap.table.create(world), gameObjectTranslator, shadowGenerator),
                                bathtub: new GwmStaticItemImporter(meshMap.bathtub.create(world), gameObjectTranslator, shadowGenerator),
                                washbasin: new GwmStaticItemImporter(meshMap.washbasin.create(world), gameObjectTranslator, shadowGenerator),
                                bed: new GwmStaticItemImporter(meshMap.bed.create(world), gameObjectTranslator, shadowGenerator),
                                room: new GwmRoomImporter(scene)
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
            wall: new WallTemplateCreator(scene),
            door: new DoorTemplateCreator(scene),
            cupboard: new ModelFileBasedTemplateCreator(
                scene,
                this.FURITURE_2_BASE_PATH,
                this.CUPBOARD_MODEL_FILE,
                [this.FURNITURE_2_MATERIAL],
                {...defaultMeshConfig, scaling: new VectorModel(0.04, 0.04, 0.04)}
            ),
            table: new ModelFileBasedTemplateCreator(
                scene,
                this.FURITURE_2_BASE_PATH,
                this.TABLE_MODEL_FILE,
                [this.FURNITURE_2_MATERIAL],
                {...defaultMeshConfig, scaling: new VectorModel(0.04, 0.04, 0.04)}
            ),
            player: new ModelFileBasedTemplateCreator(
                scene,
                this.PLAYER_BASE_PATH,
                this.PLAYER_MODEL_FILE,
                this.PLAYER_MATERIALS,
                {...defaultMeshConfig, singleton: true, scaling: new VectorModel(0.3, 0.3, 0.3)}
            ),
            floor: new FloorTemplateCreator(scene),
            window: null,
            bathtub: new ModelFileBasedTemplateCreator(
                scene,
                this.FURITURE_3_BASE_PATH,
                this.BATHTUB_MODEL_FILE,
                [this.FURNITURE_3_MATERIAL],
                {...defaultMeshConfig, scaling: new VectorModel(3, 3, 3)}
            ),
            washbasin: new ModelFileBasedTemplateCreator(
                scene,
                this.FURITURE_3_BASE_PATH,
                this.WASHBASIN_MODEL_FILE,
                [this.FURNITURE_3_MATERIAL],
                {...defaultMeshConfig, scaling: new VectorModel(3, 3, 3)}
            ),
            bed: new ModelFileBasedTemplateCreator(
                scene,
                this.FURNITURE_1_BASE_PATH,
                this.BED_MODEL_FILE,
                [this.FURNITURE_1_MATERIAL],
                {...defaultMeshConfig, scaling: new VectorModel(0.04, 0.04, 0.04)}
            )
        };

        return Promise.all([
            (<AsyncTemplateCreator> meshMap.cupboard).doAsyncWork(),
            (<AsyncTemplateCreator> meshMap.player).doAsyncWork(),
            (<AsyncTemplateCreator> meshMap.table).doAsyncWork(),
            (<AsyncTemplateCreator> meshMap.bathtub).doAsyncWork(),
            (<AsyncTemplateCreator> meshMap.washbasin).doAsyncWork(),
            (<AsyncTemplateCreator> meshMap.bed).doAsyncWork()
        ])
        .then(() => meshMap);
    }
}

