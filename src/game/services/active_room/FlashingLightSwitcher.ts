import { LightSwitcher } from './LightSwitcher';
import { World } from '../../world/World';
import { NormalLightSwitcher } from './NormalLightSwitcher';
import { GameObject } from '../../world/world_items/item_types/GameObject';
import { Room } from '../../world/world_items/item_types/Room';

export class FlashingLightSwitcher implements LightSwitcher {
    private normalLightSwitcher: NormalLightSwitcher;

    constructor(normalLightSwitcher: NormalLightSwitcher) {
        this.normalLightSwitcher = normalLightSwitcher;
    }

    public on(room: GameObject, world: World): Promise<void> {
        const generator = this.turnLightOnWithFlashing(room, world);
        return this.spawn(generator);
        // return new Promise((resolve) => {

        //     // for (let n of this.turnLightOnWithFlashing(room, world)) {}



        //     // resolve();
        // });
    }

    private spawn(iterator): Promise<void> {

        return new Promise(
            resolve =>
            (function iterate(val) {
                const {value, done} = iterator.next(val);
                if (done) {
                    resolve(val);
                } else {
                    Promise.resolve(value).then(iterate);
                }
            })()
        );

      }


    public off(room: GameObject, world: World): Promise<void> {
        return null;
    }

    private *turnLightOnWithFlashing(room: GameObject, world: World) {
        yield this.normalLightSwitcher.on(<Room> room, world);
        yield this.sleep(room, world, 200);
        yield this.normalLightSwitcher.off(<Room> room, world);
        yield this.sleep(room, world, 200);
        yield this.normalLightSwitcher.on(<Room> room, world);
        yield this.sleep(room, world, 200);
        yield this.normalLightSwitcher.off(<Room> room, world);
        yield this.sleep(room, world, 200);
        yield this.normalLightSwitcher.on(<Room> room, world);
    }

    private sleep(room: GameObject, world: World, timeout: number): Promise<void> {
        return new Promise(resolve => {
            setTimeout(() => {console.log('timeout'); resolve(); }, timeout);
        });
    }
}
