import { ToolMesh } from './ToolMesh';
import { SpotLight, Scene, ArcRotateCamera, Vector3, Tools, Viewport } from '@babylonjs/core';
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

        const camera = new ArcRotateCamera('camera2', -Math.PI / 2, Math.PI / 2, 3, vector, this.scene);
        camera.attachControl(this.world.canvas, true);
        camera.viewport = new Viewport(0, 0, 1, 1);
        camera.state

        setTimeout(() => {
            Tools.CreateScreenshot(this.world.engine, camera, 500, (data) => {
                console.log(data);
            });
        }, 5000);

        // this.scene.activeCameras.push(camera);
        this.world.scene.activeCameras.push(camera);
        return camera;
    }

    public disable() {

    }
}
