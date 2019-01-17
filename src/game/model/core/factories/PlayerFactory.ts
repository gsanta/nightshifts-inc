import { ItemFactory } from './ItemFactory';
import { GameObject } from 'game-worldmap-generator';
import { MeshModel } from '../MeshModel';
import { ShadowGenerator, Scene, SpotLight } from 'babylonjs';
import { MeshTemplate } from '../templates/MeshTemplate';
import { GameObjectTranslator } from '../../../game_map_creator/GameObjectToRealWorldCoordinateWrapper';
import { VectorModel, toVector3 } from '../VectorModel';
import { Player } from '../../creature/type/Player';
import { UserInputEventEmitter } from '../../creature/motion/UserInputEventEmitter';
import { WorldMap } from '../../../game_map_creator/WorldMap';
import { ActionStrategy } from '../../creature/action/ActionStrategy';
import { CollisionDetector } from '../../creature/collision/CollisionDetector';
import { ManualMotionStrategy } from '../../creature/motion/ManualMotionStrategy';
import { EyeSensor } from '../../creature/sensor/EyeSensor';

export class PlayerFactory implements ItemFactory {
    private meshModelTemplate: MeshTemplate;
    private gameObjectTranslator: GameObjectTranslator;
    private shadowGenerator: ShadowGenerator;
    private scene: Scene;
    private spotLight: SpotLight;

    constructor(
        meshModelTemplate: MeshTemplate,
        gameObjectTranslator: GameObjectTranslator,
        scene: Scene,
        shadowGenerator: ShadowGenerator,
        spotLight: SpotLight
    ) {
        this.meshModelTemplate = meshModelTemplate;
        this.gameObjectTranslator = gameObjectTranslator;
        this.shadowGenerator = shadowGenerator;
        this.scene = scene;
        this.spotLight = spotLight;
    }


    public createItem(gameObject: GameObject, worldMap: WorldMap): MeshModel {
        const mesh = this.meshModelTemplate.createMeshes()[0];
        const translate2 = this.gameObjectTranslator.getTranslate(gameObject);
        const translate = new VectorModel(translate2.x(), 0, -translate2.y());
        translate.addZ(-2);

        const keyboardHandler = new UserInputEventEmitter();
        keyboardHandler.subscribe();
        const player = new Player(mesh, this.meshModelTemplate.getSkeletons()[0], this.scene, this.spotLight, keyboardHandler);

        const actionStrategy = new ActionStrategy(player, worldMap);

        const collisionDetector = new CollisionDetector(player, this.scene)
        const manualMotionStrategy = new ManualMotionStrategy(player, collisionDetector, keyboardHandler);

        player.setMotionStrategy(manualMotionStrategy);
        player.setSensor(new EyeSensor(player, this.scene));
        player.setActionStrategy(actionStrategy);
        // player.translate(translate);
        player.mesh.translate(toVector3(translate), 1, BABYLON.Space.WORLD);

        return player;
    }
}
