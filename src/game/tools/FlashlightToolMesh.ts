import { ToolMesh } from './ToolMesh';
import { SpotLight, Scene, ShadowGenerator } from 'babylonjs';
import { Player } from '../world/world_items/player/Player';

export class FlashlightToolMesh implements ToolMesh {
    public name = 'flashlight';
    private flashLight: SpotLight;
    private player: Player;

    constructor(scene: Scene, player: Player) {
        this.flashLight = this.createFlashLight(scene);
        this.player = player;
    }

    public enable() {
        this.flashLight.setEnabled(true);
        this.flashLight.parent = this.player.mesh;
    }

    public disable() {
        this.flashLight.setEnabled(false);
        this.flashLight.parent = null;
    }

    private createFlashLight(scene: Scene) {
        const spotLight = new BABYLON.SpotLight('spot-light', new BABYLON.Vector3(0, 7, 1), new BABYLON.Vector3(0, 0, -5), Math.PI / 4, 3, scene);
        spotLight.diffuse = new BABYLON.Color3(1, 1, 1);
        spotLight.setEnabled(false);
        return spotLight;
    }

    private createShadowGenerator(scene: Scene, spotLight: SpotLight): ShadowGenerator {
        const shadowGenerator = new BABYLON.ShadowGenerator(1024, spotLight);
        shadowGenerator.usePoissonSampling = true;

        return shadowGenerator;
    }
}
