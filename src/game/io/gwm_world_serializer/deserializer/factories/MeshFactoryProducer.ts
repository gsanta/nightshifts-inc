import { MeshFactory } from './MeshFactory';
import { Scene, ShadowGenerator, SpotLight } from 'babylonjs';
import { WallFactory } from './WallFactory';
import { DoorFactory } from './DoorFactory';
import { Promise } from 'es6-promise';
import { PlayerFactory } from './PlayerFactory';
import { FloorFactory } from './FloorFactory';
import { WindowFactory } from './WindowFactory';
import { StaticItemFactory } from './StaticItemFactory';
import { Vector2Model } from '../../../../model/utils/Vector2Model';
import { GameObjectToWorldCenterTranslatorDecorator } from '../../GameObjectToWorldCenterTranslatorDecorator';
import { GameObjectToRealWorldCoordinateWrapper } from '../../GameObjectToRealWorldCoordinateWrapper';
import { ItemDeserializer } from '../../../json_world_serializer/factories/ItemDeserializer';
import { DefaultDeserializer } from '../../../json_world_serializer/factories/DefaultDeserializer';
import { TemplateCreator } from '../../../../model/core/templates/TemplateCreator';
import { WallTemplateCreator } from '../../../../model/core/templates/creators/WallTemplateCreator';
import { DoorTemplateCreator } from '../../../../model/core/templates/creators/DoorTemplateCreator';
import { ModelFileBasedTemplateCreator, defaultMeshConfig } from '../../../../model/core/templates/creators/ModelFileBasedTemplateCreator';
import { VectorModel } from '../../../../model/core/VectorModel';
import { FloorTemplateCreator } from '../../../../model/core/templates/creators/FloorTemplateCreator';
import { WindowTemplateCreator } from '../../../../model/core/templates/creators/WindowTemplateCreator';
import { AsyncTemplateCreator } from '../../../../model/core/templates/AsyncTemplateCreator';

export class MeshFactoryProducer {

    private static FURNITURE_1_MATERIAL = 'assets/models/furniture_1/material/beds.png';
    private static FURNITURE_1_BASE_PATH = '/assets/models/furniture_1/';
    private static BED_MODEL_FILE = 'bed.babylon';

    private static FURNITURE_2_MATERIAL = 'assets/models/furniture_2/material/furniture.png';
    private static FURITURE_2_BASE_PATH = '/assets/models/furniture_2/';
    private static CUPBOARD_MODEL_FILE = 'cupboard.babylon';
    private static TABLE_MODEL_FILE = 'table.babylon';

    private static FURNITURE_3_MATERIAL = 'assets/models/furniture_3/material/bathroom.png';
    private static FURITURE_3_BASE_PATH = '/assets/models/furniture_3/';
    private static BATHTUB_MODEL_FILE = 'bathtub.babylon';
    private static WASHBASIN_MODEL_FILE = 'wash_basin.babylon';


    private static PLAYER_BASE_PATH = 'assets/models/player/';
    private static PLAYER_MODEL_FILE = 'player.babylon';
    private static PLAYER_MATERIALS = [
        'assets/models/player/material/0.jpg',
        'assets/models/player/material/1.jpg',
        'assets/models/player/material/2.jpg',
        'assets/models/player/material/3.jpg'
    ];

    public static getFactory(scene: Scene, worldDimensions: Vector2Model, shadowGenerator: ShadowGenerator, spotLight: SpotLight): Promise<MeshFactory> {
        const gameObjectTranslator = new GameObjectToWorldCenterTranslatorDecorator(
            worldDimensions, 1, new GameObjectToRealWorldCoordinateWrapper(worldDimensions, 1)
        );

        return this.getTemplateProducers(scene, worldDimensions)
            .then(meshMap => {
                return new MeshFactory(
                    {
                        wall: new WallFactory(meshMap.wall.create(), gameObjectTranslator, shadowGenerator, 1),
                        door: new DoorFactory(meshMap.door.create(), gameObjectTranslator, shadowGenerator, 1),
                        player: new PlayerFactory(meshMap.player.create(), gameObjectTranslator, scene, shadowGenerator, spotLight),
                        floor: new FloorFactory(meshMap.floor.create(), gameObjectTranslator, shadowGenerator),
                        window: new WindowFactory(meshMap.window.create(), gameObjectTranslator, shadowGenerator, 1),
                        cupboard: new StaticItemFactory(meshMap.cupboard.create(), gameObjectTranslator, shadowGenerator),
                        table: new StaticItemFactory(meshMap.table.create(), gameObjectTranslator, shadowGenerator),
                        bathtub: new StaticItemFactory(meshMap.bathtub.create(), gameObjectTranslator, shadowGenerator),
                        washbasin: new StaticItemFactory(meshMap.washbasin.create(), gameObjectTranslator, shadowGenerator),
                        bed: new StaticItemFactory(meshMap.bed.create(), gameObjectTranslator, shadowGenerator)
                    }
                );
            });
    }

    public static getFactory2(scene: Scene, worldDimensions: Vector2Model, shadowGenerator: ShadowGenerator, spotLight: SpotLight): Promise<ItemDeserializer> {
        return this.getTemplateProducers(scene, worldDimensions)
            .then(meshMap => {
                return new DefaultDeserializer(meshMap.wall.create(), shadowGenerator);
            });
    }

    private static getTemplateProducers(scene: Scene, worldDimensions: Vector2Model): Promise<MeshMap<TemplateCreator>> {
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
