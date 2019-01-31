
import { ShadowGenerator, Scene, SpotLight } from 'babylonjs';
import { JsonItemDeserializer } from './JsonItemDeserializer';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { MeshModel, SerializedMeshModel } from '../../../../model/core/MeshModel';
import { Player } from '../../../../model/creature/type/Player';
import { UserInputEventEmitter } from '../../../../model/creature/motion/UserInputEventEmitter';
import { CollisionDetector } from '../../../../model/creature/collision/CollisionDetector';
import { ManualMotionStrategy } from '../../../../model/creature/motion/ManualMotionStrategy';
import { EyeSensor } from '../../../../model/creature/sensor/EyeSensor';
import { ActionStrategy } from '../../../../model/creature/action/ActionStrategy';
import { World } from '../../../../model/World';

export class JsonPlayerDeserializer implements JsonItemDeserializer {
    private meshModelTemplate: MeshTemplate;
    private shadowGenerator: ShadowGenerator;
    private scene: Scene;
    private spotLight: SpotLight;

    constructor(
        scene: Scene,
        meshModelTemplate: MeshTemplate,
        shadowGenerator: ShadowGenerator,
        spotLight: SpotLight
    ) {
        this.meshModelTemplate = meshModelTemplate;
        this.shadowGenerator = shadowGenerator;
        this.scene = scene;
        this.spotLight = spotLight;
    }

    public createItem(serializedMeshModel: SerializedMeshModel, world: World): MeshModel {
        const mesh = this.meshModelTemplate.createMeshes()[0];
        mesh.scaling.x = serializedMeshModel.scaling.x;
        mesh.scaling.y = serializedMeshModel.scaling.y;
        mesh.scaling.z = serializedMeshModel.scaling.z;


        const keyboardHandler = new UserInputEventEmitter();
        keyboardHandler.subscribe();

        const player = new Player(mesh, this.meshModelTemplate.getSkeletons()[0], this.scene, this.spotLight, keyboardHandler);

        const collisionDetector = new CollisionDetector(player, this.scene);
        const manualMotionStrategy = new ManualMotionStrategy(player, collisionDetector, keyboardHandler);

        const actionStrategy = new ActionStrategy(player, world);

        player.setMotionStrategy(manualMotionStrategy);
        player.setSensor(new EyeSensor(player, this.scene));
        player.setActionStrategy(actionStrategy);
        // player.translate(translate);

        return player;
    }
}
