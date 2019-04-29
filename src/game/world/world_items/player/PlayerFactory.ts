import { GwmItemImporter } from '../../world_factory/GwmItemImporter';
import { GwmWorldItem } from 'game-worldmap-generator';
import { ShadowGenerator, Scene, SpotLight, Mesh, Skeleton } from 'babylonjs';
import { WorldItemTranslator } from '../world_item_mappers/WorldItemToRealWorldCoordinateMapper';
import { World } from '../../World';
import { WorldItem } from '../WorldItem';
import { VectorModel, toVector3 } from '../../../model/core/VectorModel';
import { UserInputEventEmitter } from '../../../interactions/motion/UserInputEventEmitter';
import { Player } from './Player';
import { ActionStrategy } from '../../../interactions/action/ActionStrategy';
import { CollisionDetector } from '../../../interactions/collision/CollisionDetector';
import { ManualMotionStrategy } from '../../../interactions/motion/ManualMotionStrategy';
import { EyeSensor } from '../../../interactions/sensor/EyeSensor';

export class PlayerFactory implements GwmItemImporter {
    private meshInfo: [Mesh, Skeleton[]];
    private gameObjectTranslator: WorldItemTranslator;
    private scene: Scene;
    private spotLight: SpotLight;

    constructor(
        meshInfo: [Mesh, Skeleton[]],
        gameObjectTranslator: WorldItemTranslator,
        scene: Scene,
        spotLight: SpotLight
    ) {
        this.meshInfo = meshInfo;
        this.gameObjectTranslator = gameObjectTranslator;
        this.scene = scene;
        this.spotLight = spotLight;
    }


    public createItem(worldItem: GwmWorldItem, world: World): WorldItem {
        const mesh = this.meshInfo[0].clone(`${this.meshInfo[0].name}`);

        world.camera.lockedTarget = mesh;

        const translate2 = this.gameObjectTranslator.getTranslate(worldItem, world);
        const translate = new VectorModel(translate2.x(), 0, -translate2.y());
        translate.addZ(-2);

        const keyboardHandler = new UserInputEventEmitter();
        keyboardHandler.subscribe();
        const player = new Player(mesh, this.meshInfo[1][0], this.scene, this.spotLight, keyboardHandler);

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
