import { GameObject } from '../model/game_objects/GameObject';
import { World } from '../model/game_objects/World';
import { Tool } from './Tool';
import console = require('console');
import { Matrix, Vector3, Ray, RayHelper, Mesh } from 'babylonjs';
import { VectorModel } from '../model/core/VectorModel';


export class PortalTool implements Tool {
    name = 'portal';

    private portal: GameObject;
    private player: GameObject;
    private world: World;
    private prevRayCast: RayHelper;
    private pickedGameObject: GameObject;

    constructor(world: World) {
        this.world = world;
        this.portal = world.getWorldItemsByName('portal')[0];
        this.player = world.getWorldItemsByName('player')[0];
    }

    createPreview() {

    }

    enable() {

    }

    disable() {

    }

    update() {
        this.castRay();
    }

    vecToLocal(vector, mesh: GameObject) {
        const m = mesh.meshes[0].getWorldMatrix();
        const v = Vector3.TransformCoordinates(vector, m);
        return v;
    }

    private castRay() {
        const origin = this.player.meshes[0].position;

        let forward = new Vector3(0, 0, -1);
        forward = this.vecToLocal(forward, this.player);

        let direction = forward.subtract(<any> origin);
        direction = Vector3.Normalize(direction);

        let length = 100;

        let ray = new Ray(origin, direction, length);

        let hit = this.world.scene.pickWithRay(ray);

        if (this.prevRayCast) {
            this.prevRayCast.dispose();
        }

        this.prevRayCast = RayHelper.CreateAndShow(ray, this.world.scene, new BABYLON.Color3(1, 1, 0.1));

        if (hit.pickedMesh) {
            const gameObject = this.world.getGameObjectForMesh(<Mesh> hit.pickedMesh);

            if (gameObject && gameObject !== this.pickedGameObject) {
                const centerPoint = gameObject.boundingBox.getBoundingCenter();
                const position = new VectorModel(centerPoint.x, 2, centerPoint.y);
                this.portal.setPosition(position);
            }
        //     console.log(this.world.getGameObjectForMesh(<Mesh> hit.pickedMesh));
        }
    }
}