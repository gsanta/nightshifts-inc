import { Scene, HemisphericLight, Vector3, Color3, PointLight, Light } from '@babylonjs/core';
import { GameObject } from '../world/world_items/item_types/GameObject';

export class MainLightSetup {

    public createLight(scene: Scene): HemisphericLight {
        const light = new HemisphericLight('main-light', new Vector3(0, 1, 0), scene);
        light.diffuse = new Color3(1, 1, 1);
        light.intensity = 1;
        return light;
    }

    public createRoomLight(room: GameObject, scene: Scene): Light {
        const dimensions = room.getBoundingBox();
        console.log('Creating light');
        console.log(dimensions);
        const center = {
            x: dimensions.getBoundingCenter().x,
            y: dimensions.getBoundingCenter().y
        };
        console.log(center);
        const light: PointLight = new PointLight('light', new Vector3(center.x, 3, center.y), scene);
        light.setEnabled(true);
        light.range = 30;
        return light;
    }
}
