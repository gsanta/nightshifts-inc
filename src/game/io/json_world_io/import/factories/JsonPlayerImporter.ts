
import { ShadowGenerator, Scene, SpotLight } from 'babylonjs';
import { JsonItemImporter } from './JsonItemImporter';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { MeshModel, SerializedMeshModel } from '../../../../model/core/MeshModel';
import { Player } from '../../../../model/creature/type/Player';
import { UserInputEventEmitter } from '../../../../model/creature/motion/UserInputEventEmitter';
import { CollisionDetector } from '../../../../model/creature/collision/CollisionDetector';
import { ManualMotionStrategy } from '../../../../model/creature/motion/ManualMotionStrategy';
import { EyeSensor } from '../../../../model/creature/sensor/EyeSensor';
import { ActionStrategy } from '../../../../model/creature/action/ActionStrategy';
import { World } from '../../../../model/World';
import { toVector3, VectorModel } from '../../../../model/core/VectorModel';

export class JsonPlayerImporter implements JsonItemImporter {
    private player: Player;
    private shadowGenerator: ShadowGenerator;
    private scene: Scene;
    private spotLight: SpotLight;

    constructor(
        scene: Scene,
        player: Player,
        shadowGenerator: ShadowGenerator,
        spotLight: SpotLight
    ) {
        this.player = player;
        this.shadowGenerator = shadowGenerator;
        this.scene = scene;
        this.spotLight = spotLight;
    }

    public createItem(serializedMeshModel: SerializedMeshModel, world: World): MeshModel {
        world.camera.lockedTarget = this.player.mesh;

        const keyboardHandler = new UserInputEventEmitter();
        keyboardHandler.subscribe();

        const collisionDetector = new CollisionDetector(this.player, this.scene);
        const manualMotionStrategy = new ManualMotionStrategy(this.player, collisionDetector, keyboardHandler);

        const actionStrategy = new ActionStrategy(this.player, world);

        this.player.setMotionStrategy(manualMotionStrategy);
        this.player.setSensor(new EyeSensor(this.player, this.scene));
        this.player.setActionStrategy(actionStrategy);
        // player.translate(translate);
        this.player.mesh.translate(toVector3(VectorModel.deserialize(serializedMeshModel.translate)), 1, BABYLON.Space.WORLD);

        return this.player;
    }
}
