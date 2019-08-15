import { Mesh, Vector3 } from 'babylonjs';
import { GameObject } from '../model/game_objects/GameObject';
import { World } from '../model/game_objects/World';
import { Tool } from './Tool';
import { RayCaster } from '../model/utils/RayCaster';

export class PortalTool implements Tool {
    name = 'portal';

    private portal: GameObject;
    private player: GameObject;
    private world: World;
    private pickedGameObject: GameObject;
    private rayCaster: RayCaster;

    constructor(world: World, rayCaster: RayCaster = new RayCaster(world.scene)) {
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
