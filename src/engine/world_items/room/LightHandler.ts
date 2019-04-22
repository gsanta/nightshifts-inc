import { Light } from 'babylonjs';
import { WorldItem } from '../../../game/world_items/WorldItem';


export class LightHandler {
    private light: Light;

    constructor(light: Light) {
        this.light = light;
    }

    enableLight(worldItem: WorldItem) {
        worldItem.getAllMeshes().forEach(mesh => {
            const index = this.light.excludedMeshes.indexOf(mesh);

            if (index !== -1) {
                this.light.excludedMeshes.splice(index, 1);
            }
        });
    }

    disableLight(worldItem: WorldItem) {

        worldItem.getAllMeshes().forEach(mesh => {
            const index = this.light.excludedMeshes.indexOf(mesh);

            if (index === -1) {
                this.light.excludedMeshes.push(mesh);
            }
        });
    }
}
