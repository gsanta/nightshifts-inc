import { TemplateCreator } from '../templates/TemplateCreator';
import { Vector2Model } from '../../utils/Vector2Model';
import { Scene, SpotLight, ShadowGenerator } from 'babylonjs';
import { MeshFactory } from './MeshFactory';
import { WallTemplateCreator } from '../templates/creators/WallTemplateCreator';
import { DoorTemplateCreator } from '../templates/creators/DoorTemplateCreator';
import { ModelFileBasedTemplateCreator, defaultMeshConfig } from '../templates/creators/ModelFileBasedTemplateCreator';
import { AsyncTemplateCreator } from '../templates/AsyncTemplateCreator';
import { VectorModel } from '../VectorModel';
import { FloorTemplateCreator } from '../templates/creators/FloorTemplateCreator';
import { WindowTemplateCreator } from '../templates/creators/WindowTemplateCreator';
import { Promise } from 'es6-promise';

interface MeshMap<V> {
    wall: V;
    door: V;
    player: V;
    cupboard: V;
    table: V;
    floor: V;
    window: V;
    bathtub: V;
    washbasin: V;
    bed: V;
}

export abstract class AbstractMeshFactoryProducer<T> {

    private readonly FURNITURE_1_MATERIAL = 'assets/models/furniture_1/material/beds.png';
    private readonly FURNITURE_1_BASE_PATH = '/assets/models/furniture_1/';
    private readonly BED_MODEL_FILE = 'bed.babylon';

    private readonly FURNITURE_2_MATERIAL = 'assets/models/furniture_2/material/furniture.png';
    private readonly FURITURE_2_BASE_PATH = '/assets/models/furniture_2/';
    private readonly CUPBOARD_MODEL_FILE = 'cupboard.babylon';
    private readonly TABLE_MODEL_FILE = 'table.babylon';

    private readonly FURNITURE_3_MATERIAL = 'assets/models/furniture_3/material/bathroom.png';
    private readonly FURITURE_3_BASE_PATH = '/assets/models/furniture_3/';
    private readonly BATHTUB_MODEL_FILE = 'bathtub.babylon';
    private readonly WASHBASIN_MODEL_FILE = 'wash_basin.babylon';


    private readonly PLAYER_BASE_PATH = 'assets/models/player/';
    private readonly PLAYER_MODEL_FILE = 'player.babylon';
    private readonly PLAYER_MATERIALS = [
        'assets/models/player/material/0.jpg',
        'assets/models/player/material/1.jpg',
        'assets/models/player/material/2.jpg',
        'assets/models/player/material/3.jpg'
    ];

    public abstract getFactory(
        scene: Scene, worldDimensions: Vector2Model, shadowGenerator: ShadowGenerator, spotLight: SpotLight): Promise<MeshFactory<T>>;

    protected getTemplateProducers(scene: Scene, worldDimensions: Vector2Model): Promise<MeshMap<TemplateCreator>> {

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
            floor: new FloorTemplateCreator(scene, worldDimensions),
            window: new WindowTemplateCreator(scene),
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

