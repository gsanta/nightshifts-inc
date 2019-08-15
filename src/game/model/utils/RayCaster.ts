import { Scene } from 'babylonjs/scene';
import { RayHelper, Vector3, PickingInfo } from 'babylonjs';
import { BabylonFactory } from './BabylonFactory';
import { GameObject } from '../game_objects/GameObject';
import { VectorUtils } from './VectorUtils';

export class RayCaster {
    private scene: Scene;
    private prevRayCast: RayHelper;
    private babylonFactory: typeof BabylonFactory;
    private vectorUtils: typeof VectorUtils;

    constructor(scene: Scene, vectorUtils: typeof VectorUtils = VectorUtils, babylonFactory: typeof BabylonFactory = BabylonFactory) {
        this.scene = scene;
        this.vectorUtils = vectorUtils;
        this.babylonFactory = babylonFactory;
    }

    castRay(gameObject: GameObject, direction: Vector3): PickingInfo {
        const origin = gameObject.meshes[0].position;

        direction = this.vectorUtils.globalToLocalVector(direction, gameObject.meshes[0]);
        direction = direction.subtract(<any> origin);
        direction = Vector3.Normalize(direction);

        let length = 100;

        let ray = new this.babylonFactory.Ray(origin, direction, length);

        let hit = this.scene.pickWithRay(ray);

        if (this.prevRayCast) {
            this.prevRayCast.dispose();
        }

        this.prevRayCast =  this.babylonFactory.RayHelper.CreateAndShow(ray, this.scene, new BABYLON.Color3(1, 1, 0.1));

        return hit;
    }
}
