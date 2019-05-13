import { Tool } from './Tool';
import { SpotLight, Scene, ArcRotateCamera, Vector3, Tools, Viewport, FreeCamera } from '@babylonjs/core';
import { World } from '../world/World';
import find from 'lodash/find';
import { Player } from '../world/world_items/item_types/Player';
import { Room } from '../world/world_items/item_types/Room';

export class CameraTool implements Tool {
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

        const camera = new FreeCamera('camera2', vector, this.scene);
        camera.setTarget(new Vector3(pos.x - 3, 1, pos.z));
        camera.attachControl(this.world.canvas, true);

        setTimeout(
            () => {
                Tools.CreateScreenshotUsingRenderTarget(this.world.engine, camera, 500, (data) => {
                    console.log(data);
                });
            },
            10000
        );

        return camera;
    }

    public disable() {

    }
}
