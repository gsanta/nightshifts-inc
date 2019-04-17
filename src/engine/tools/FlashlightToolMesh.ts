import { ToolMesh } from './ToolMesh';
import { SpotLight } from 'babylonjs';

export class FlashlightToolMesh implements ToolMesh {
    public name = 'flashlight';
    private spotLight: SpotLight;


    constructor(spotLight: SpotLight) {
        this.spotLight = spotLight;
    }

    public enable() {
        this.spotLight.setEnabled(true);
    }

    public disable() {
        this.spotLight.setEnabled(false);
    }
}
