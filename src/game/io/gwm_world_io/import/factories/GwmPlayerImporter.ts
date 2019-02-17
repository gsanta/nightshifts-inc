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


    public createItem(gameObject: GameObject, world: World): MeshModel {
        const mesh = this.meshModelTemplate.createMeshes()[0];

        world.camera.lockedTarget = mesh;

        const translate2 = this.gameObjectTranslator.getTranslate(gameObject, world);
        const translate = new VectorModel(translate2.x(), 0, -translate2.y());
        translate.addZ(-2);

        const keyboardHandler = new UserInputEventEmitter();
        keyboardHandler.subscribe();
        const player = new Player(mesh, this.meshModelTemplate.getSkeletons()[0], this.scene, this.spotLight, keyboardHandler);

        const actionStrategy = new ActionStrategy(player, world);

        const collisionDetector = new CollisionDetector(player, this.scene);
        const manualMotionStrategy = new ManualMotionStrategy(player, collisionDetector, keyboardHandler);

        player.setMotionStrategy(manualMotionStrategy);
        player.setSensor(new EyeSensor(player, this.scene));
        player.setActionStrategy(actionStrategy);
        // player.translate(translate);
        player.mesh.translate(toVector3(translate), 1, BABYLON.Space.WORLD);

        return player;
    }
}
