import { ToolMesh } from './ToolMesh';
import { SpotLight, Scene, ArcRotateCamera, Vector3, Tools, Viewport, FreeCamera } from '@babylonjs/core';
import { Player } from '../world/world_items/player/Player';
import { World } from '../world/World';
import { Room } from '../world/world_items/room/Room';
import find from 'lodash/find';

export class CameraTool implements ToolMesh {
    public name = 'flashlight';
    private flashLight: SpotLight;
    private player: Player;
    private scene: Scene;
    private world: World;

    constructor(scene: Scene, world: World) {
        this.scene = scene;
        this.player = world.player;
        this.world = world;
    }

    public enable() {
        const room = <Room> this.world.getWorldItemsByName('room')[0];
        const emptyArea = find(room.children, child => child.type === 'empty');
        const pos = emptyArea.getCenterPosition();
        const vector = new Vector3(pos.x, 1, pos.z);

        // const camera = new ArcRotateCamera('camera2', -Math.PI / 2, Math.PI / 2, 3, vector, this.scene);
        const camera = new FreeCamera('camera2', vector, this.scene);
        camera.setTarget(new Vector3(pos.x - 3, 1, pos.z));
        camera.attachControl(this.world.canvas, true);

        setTimeout(() => {
            Tools.CreateScreenshotUsingRenderTarget(this.world.engine, camera, 500, (data) => {
                console.log(data);
            });
        }, 1000);

        // this.scene.activeCameras.push(camera);
        // this.world.scene.activeCameras.push(camera);
        return camera;
    }

    public disable() {

    }
}
