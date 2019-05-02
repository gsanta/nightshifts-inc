import { FollowCamera, Scene } from 'babylonjs';
import { World } from '../../../world/World';
import { ActionHandler } from '../../ActionHandler';
import { GameActionType } from '../../GameActionType';

/**
 * Currently the main camera in the game, which works by following the user.
 */
export class CreateFollowCameraActionHandler implements ActionHandler {
    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.GAME_IS_READY:
                const camera = this.createCamera(world.scene);
                camera.lockedTarget = world.getWorldItemsByName('player')[0].mesh;
                break;
            default:
                break;
        }
    }

    private createCamera(scene: Scene): FollowCamera {
        const camera = new BABYLON.FollowCamera('camera', new BABYLON.Vector3(0, 120, 0), scene);

        camera.radius = 60;
        camera.heightOffset = 30;
        camera.rotationOffset = 0;
        camera.cameraAcceleration = 0.05;
        camera.maxCameraSpeed = 20;

        return camera;
    }
}
