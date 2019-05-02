import { ActionHandler } from '../../ActionHandler';
import { World } from '../../../world/World';
import { GameActionType } from '../../GameActionType';
import { Scene, HemisphericLight, Vector3, Color3 } from 'babylonjs';


/**
 * The main light of the game which illuminates the active room.
 */
export class CreateMainLightActionHandler implements ActionHandler {
    public handle(type: string, world: World) {
        switch (type) {
            case GameActionType.GAME_IS_READY:
                const mainLight = this.createHemisphericLight(world.scene);
                world.hemisphericLight = mainLight;
                break;
            default:
                break;
        }
    }

    private createHemisphericLight(scene: Scene): HemisphericLight {
        const light = new HemisphericLight('main-light', new Vector3(0, 1, 0), scene);
        light.diffuse = new Color3(1, 1, 1);
        light.intensity = 1;
        return light;
    }
}
