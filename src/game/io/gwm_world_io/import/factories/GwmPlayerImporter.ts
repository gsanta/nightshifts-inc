import { GwmItemImporter } from './GwmItemImporter';
import { GameObject } from 'game-worldmap-generator';
import { ShadowGenerator, Scene, SpotLight } from 'babylonjs';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { GameObjectTranslator } from '../game_object_mappers/GameObjectToRealWorldCoordinateMapper';
import { World } from '../../../../model/World';
import { MeshModel } from '../../../../model/core/MeshModel';
import { VectorModel, toVector3 } from '../../../../model/core/VectorModel';
import { UserInputEventEmitter } from '../../../../model/creature/motion/UserInputEventEmitter';
import { Player } from '../../../../model/creature/type/Player';
import { ActionStrategy } from '../../../../model/creature/action/ActionStrategy';
import { CollisionDetector } from '../../../../model/creature/collision/CollisionDetector';
import { ManualMotionStrategy } from '../../../../model/creature/motion/ManualMotionStrategy';
import { EyeSensor } from '../../../../model/creature/sensor/EyeSensor';

export class GwmPlayerImporter implements GwmItemImporter {
    private player: Player;
    private gameObjectTranslator: GameObjectTranslator;
    private shadowGenerator: ShadowGenerator;
    private scene: Scene;
    private spotLight: SpotLight;

    constructor(
        player: Player,
        gameObjectTranslator: GameObjectTranslator,
        scene: Scene,
        shadowGenerator: ShadowGenerator,
        spotLight: SpotLight
    ) {
        this.player = player;
        this.gameObjectTranslator = gameObjectTranslator;
        this.shadowGenerator = shadowGenerator;
        this.scene = scene;
        this.spotLight = spotLight;
    }


    public createItem(gameObject: GameObject, world: World): MeshModel {
        world.camera.lockedTarget = this.player.mesh;

        const translate2 = this.gameObjectTranslator.getTranslate(gameObject, world);
        const translate = new VectorModel(translate2.x(), 0, -translate2.y());
        translate.addZ(-2);

        const keyboardHandler = new UserInputEventEmitter();
        keyboardHandler.subscribe();

        const actionStrategy = new ActionStrategy(this.player, world);

        const collisionDetector = new CollisionDetector(this.player, this.scene);
        const manualMotionStrategy = new ManualMotionStrategy(this.player, collisionDetector, keyboardHandler);

        this.player.setMotionStrategy(manualMotionStrategy);
        this.player.setSensor(new EyeSensor(this.player, this.scene));
        this.player.setActionStrategy(actionStrategy);
        this.player.mesh.translate(toVector3(translate), 1, BABYLON.Space.WORLD);

        return this.player;
    }
}
