import { MeshFactory } from './MeshFactory';
import { TemplateCreator } from '../templates/TemplateCreator';
import { WallTemplateCreator } from '../templates/creators/WallTemplateCreator';
import { Scene, ShadowGenerator, SpotLight } from 'babylonjs';
import { DoorTemplateCreator } from '../templates/creators/DoorTemplateCreator';
import { ModelFileBasedTemplateCreator, defaultMeshConfig } from '../templates/creators/ModelFileBasedTemplateCreator';
import { VectorModel } from '../VectorModel';
import { AsyncTemplateCreator } from '../templates/AsyncTemplateCreator';
import { GameObjectToWorldCenterTranslatorDecorator } from '../../../game_map_creator/GameObjectToWorldCenterTranslatorDecorator';
import { Vector2Model } from '../../utils/Vector2Model';
import { GameObjectToRealWorldCoordinateWrapper } from '../../../game_map_creator/GameObjectToRealWorldCoordinateWrapper';
import { WallFactory } from './WallFactory';
import { DoorFactory } from './DoorFactory';
import { FloorTemplateCreator } from '../templates/creators/FloorTemplateCreator';
import { Promise } from 'es6-promise';
import { PlayerFactory } from './PlayerFactory';
import { FloorFactory } from './FloorFactory';
import { WindowTemplateCreator } from '../templates/creators/WindowTemplateCreator';
import { WindowFactory } from './WindowFactory';
import { StaticItemFactory } from './StaticItemFactory';

interface MeshMap<V> {
    wall: V;
    door: V;
    player: V;
    cupboard: V;
    floor: V;
    window: V;
}

export class MeshFactoryProducer {

    private static CUPBOARD_MATERIAL_FILE = 'models/furniture/furniture.png';
    private static CUPBOARD_MODEL_FILE = 'cupboard.babylon';
    private static FURNITURE_BASE_PATH = '/models/furniture/';

    private static PLAYER_BASE_PATH = 'models/dude/';
    private static PLAYER_MODEL_FILE = 'Dude.babylon';

    public static getFactory(scene: Scene, worldDimensions: Vector2Model, shadowGenerator: ShadowGenerator, spotLight: SpotLight): Promise<MeshFactory> {
        const gameObjectTranslator = new GameObjectToWorldCenterTranslatorDecorator(
            worldDimensions, 1, new GameObjectToRealWorldCoordinateWrapper(worldDimensions, 1)
        );

        return this.getTemplateProducers(scene, worldDimensions)
            .then(meshMap => {
                return new MeshFactory(
                    scene,
                    {
                        wall: new WallFactory(meshMap.wall.create(), gameObjectTranslator, shadowGenerator, 1),
                        door: new DoorFactory(meshMap.door.create(), gameObjectTranslator, shadowGenerator, 1),
                        player: new PlayerFactory(meshMap.player.create(), gameObjectTranslator, scene, shadowGenerator, spotLight),
                        floor: new FloorFactory(meshMap.floor.create(), gameObjectTranslator, shadowGenerator),
                        window: new WindowFactory(meshMap.window.create(), gameObjectTranslator, shadowGenerator, 1),
                        cupboard: new StaticItemFactory(meshMap.cupboard.create(), gameObjectTranslator, shadowGenerator)
                    }
                );
            });
    }

    private static getTemplateProducers(scene: Scene, worldDimensions: Vector2Model): Promise<MeshMap<TemplateCreator>> {
        const meshMap: MeshMap<TemplateCreator> = {
            wall: new WallTemplateCreator(scene),
            door: new DoorTemplateCreator(scene),
            cupboard: new ModelFileBasedTemplateCreator(
                scene,
                this.FURNITURE_BASE_PATH,
                this.CUPBOARD_MODEL_FILE,
                this.CUPBOARD_MATERIAL_FILE,
                {...defaultMeshConfig, scaling: new VectorModel(0.04, 0.04, 0.04)}
            ),
            player: new ModelFileBasedTemplateCreator(
                scene,
                this.PLAYER_BASE_PATH,
                this.PLAYER_MODEL_FILE,
                null,
                {...defaultMeshConfig, singleton: true, scaling: new VectorModel(0.1, 0.1, 0.1)}
            ),
            floor: new FloorTemplateCreator(scene, worldDimensions),
            window: new WindowTemplateCreator(scene)
        };

        return Promise.all([
            (<AsyncTemplateCreator> meshMap.cupboard).doAsyncWork(),
            (<AsyncTemplateCreator> meshMap.player).doAsyncWork(),
        ])
        .then(() => meshMap);
    }
}
