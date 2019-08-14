import { Mesh, PickingInfo, RayHelper, Scene, Vector3 } from 'babylonjs';
import { GameObject } from '../model/game_objects/GameObject';
import { World } from '../model/game_objects/World';
import { BabylonFactory } from '../model/utils/BabylonFactory';
import { globalToLocalVector } from '../model/utils/Vector';
import { Tool } from './Tool';

export class RayCaster {
    private scene: Scene;
    private prevRayCast: RayHelper;
    private babylonFactory: typeof BabylonFactory;

    constructor(scene: Scene, babylonFactory: typeof BabylonFactory) {
        this.scene = scene;
        this.babylonFactory = babylonFactory;
    }

    castRay(gameObject: GameObject, direction: Vector3): PickingInfo {
        const origin = gameObject.meshes[0].position;

        direction = globalToLocalVector(direction, gameObject.meshes[0]);
        direction = direction.subtract(<any> origin);
        direction = Vector3.Normalize(direction);

        let length = 100;

        let ray = new this.babylonFactory.Ray(origin, direction, length);

        let hit = this.scene.pickWithRay(ray);

        if (this.prevRayCast) {
            this.prevRayCast.dispose();
        }

        this.prevRayCast = RayHelper.CreateAndShow(ray, this.scene, new BABYLON.Color3(1, 1, 0.1));

        return hit;
    }
}

export class PortalTool implements Tool {
    name = 'portal';

    private portal: GameObject;
    private player: GameObject;
    private world: World;
    private pickedGameObject: GameObject;
    private rayCaster: RayCaster;

    constructor(world: World, rayCaster: RayCaster = new RayCaster(world.scene, BabylonFactory)) {
        this.world = world;
        this.portal = world.getWorldItemsByType('portal')[0];
        this.player = world.getWorldItemsByType('player')[0];
        this.rayCaster = rayCaster;
    }

    createPreview() {

    }

    enable() {

    }

    disable() {

    }

    update() {
        const pickingInfo = this.rayCaster.castRay(this.player, new Vector3(0, 0, -1));

        if (pickingInfo.hit) {
            const gameObject = this.world.getGameObjectForMesh(<Mesh> pickingInfo.pickedMesh);

            if (gameObject && gameObject !== this.pickedGameObject) {
                const centerPoint = gameObject.boundingBox.getBoundingCenter();
                const position = new Vector3(centerPoint.x, 8, centerPoint.y);
                this.portal.setPosition(position);
                this.portal.meshes[0].position.y = 8;

                this.portal.meshes[0].rotationQuaternion = pickingInfo.pickedMesh.rotationQuaternion;
            }
        }
    }
}
