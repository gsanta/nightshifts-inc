import { FollowCamera, Scene, Vector3 } from '@babylonjs/core';
import { World } from '../../../world/World';
import { ActionHandler } from '../../ActionHandler';
import { GameActionType } from '../../GameActionType';
import { CameraTool } from '../../../tools/CameraTool';

/**
 * Currently the main camera in the game, which works by following the user.
 */
export class CreateFollowCameraActionHandler implements ActionHandler {
    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.GAME_IS_READY:
                // const camera = this.createCamera(world.scene);
                // camera.lockedTarget = world.getWorldItemsByName('player')[0].mesh;
                // world.scene.activeCameras.push(camera);

                const cameraTool = new CameraTool(world.scene, world);
                cameraTool.enable();
                break;
            default:
                break;
        }
    }

    private createCamera(scene: Scene): FollowCamera {
        const camera = new FollowCamera('camera', new Vector3(0, 120, 0), scene);

        camera.radius = 60;
        camera.heightOffset = 30;
        camera.rotationOffset = 0;
        camera.cameraAcceleration = 0.05;
        camera.maxCameraSpeed = 20;

        return camera;
    }
}
