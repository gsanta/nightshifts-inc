import { FreeCamera, Scene, SpotLight, Tools, Vector3 } from 'babylonjs';
import find from 'lodash/find';
import { World } from '../model/game_objects/World';
import { Tool } from './Tool';

export class CameraTool implements Tool {
    public name = 'flashlight';
    private flashLight: SpotLight;
    private scene: Scene;
    private world: World;

    constructor(scene: Scene, world: World) {
        this.scene = scene;
        this.world = world;
    }

    public enable() {
        const room = this.world.getWorldItemsByName('room')[0];
        const emptyArea = find(room.children, child => child.type === 'empty');

        const pos = emptyArea.boundingBox.getBoundingCenter();
        const vector = new Vector3(pos.x, 1, pos.y);

        const camera = new FreeCamera('camera2', vector, this.scene);
        camera.setTarget(new Vector3(pos.x - 3, 1, pos.y));
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

    update() {

    }
}
