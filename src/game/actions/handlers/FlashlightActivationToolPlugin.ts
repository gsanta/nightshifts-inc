import { ToolActivationPlugin } from './ToolActivationPlugin';
import { World } from '../../model/World';

export class FlashlightActivationToolPlugin implements ToolActivationPlugin {
    toolName = 'flashlight';
    private world: World;

    constructor(world: World) {
        this.world = world;
    }

    activate() {
        this.world.spotLight.setEnabled(true);
    }

    deactivate() {
        this.world.spotLight.setEnabled(false);
    }
}
