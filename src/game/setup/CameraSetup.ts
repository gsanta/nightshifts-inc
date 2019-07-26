import { Scene, FollowCamera, Vector3 } from '@babylonjs/core';
import { GameObject } from '../world/world_items/item_types/GameObject';


export class CameraSetup {
    public createCamera(scene: Scene, player: GameObject): FollowCamera {
        const camera = new FollowCamera('camera', new Vector3(0, 120, 0), scene);

        camera.radius = 60;
        camera.heightOffset = 30;
        camera.rotationOffset = 0;
        camera.cameraAcceleration = 0.05;
        camera.maxCameraSpeed = 20;

        camera.lockedTarget = player.mesh;

        return camera;
    }
}