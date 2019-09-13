import { Scene, HemisphericLight, Vector3, Color3, PointLight, Light } from 'babylonjs';
import { GameObject } from '../model/game_objects/GameObject';
import { World } from '../model/game_objects/World';

export class MainLightSetup {

    public createEnvironmentLight(world: World): HemisphericLight {
        const light = new HemisphericLight('main-light', new Vector3(0, 1, 0), world.scene);
        light.diffuse = new Color3(1, 1, 1);
        light.intensity = 1;
        world.environmentLight = light;

        world.rooms.forEach(room => room.switchLights(false));

        return light;
    }

    public createRoomLight(scene: Scene): PointLight {
        console.log('Creating light');

        const light: PointLight = new PointLight('light', new Vector3(0, 20, 0), scene);

        light.setEnabled(true);
        light.range = 50;
        return light;
    }
}
