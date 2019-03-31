
import { ShadowGenerator, Scene, SpotLight } from 'babylonjs';
import { JsonItemImporter } from './JsonItemImporter';
import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { WorldItem, SerializedMeshModel } from '../../../../world_items/WorldItem';
import { Player } from '../../../../model/creature/type/Player';
import { UserInputEventEmitter } from '../../../../model/creature/motion/UserInputEventEmitter';
import { CollisionDetector } from '../../../../model/creature/collision/CollisionDetector';
import { ManualMotionStrategy } from '../../../../model/creature/motion/ManualMotionStrategy';
import { EyeSensor } from '../../../../model/creature/sensor/EyeSensor';
import { ActionStrategy } from '../../../../model/creature/action/ActionStrategy';
import { World } from '../../../../model/World';
import { toVector3, VectorModel } from '../../../../model/core/VectorModel';
import { BabylonMeshWrapper } from '../../../../../engine/wrappers/babylon/BabylonMeshWrapper';

export class JsonPlayerImporter implements JsonItemImporter {
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

    public createItem(serializedMeshModel: SerializedMeshModel, world: World): WorldItem {
        const mesh = this.meshModelTemplate.createMeshes()[0];
        world.camera.lockedTarget = mesh.wrappedMesh;

        const keyboardHandler = new UserInputEventEmitter();
        keyboardHandler.subscribe();

        const player = new Player(<BabylonMeshWrapper> mesh, this.meshModelTemplate.getSkeletons()[0], this.scene, this.spotLight, keyboardHandler);
        // mesh.scaling.x = 1
        // mesh.scaling.y = 1
        // mesh.scaling.z = 1

        const collisionDetector = new CollisionDetector(player, this.scene);
        const manualMotionStrategy = new ManualMotionStrategy(player, collisionDetector, keyboardHandler);

        const actionStrategy = new ActionStrategy(player, world);

        player.setMotionStrategy(manualMotionStrategy);
        player.setSensor(new EyeSensor(player, this.scene));
        player.setActionStrategy(actionStrategy);
        // player.translate(translate);
        player.mesh.wrappedMesh.translate(toVector3(VectorModel.deserialize(serializedMeshModel.translate)), 1, BABYLON.Space.WORLD);

        return player;
    }
}
