import { LightSwitcher } from './LightSwitcher';
import { Room } from '../../../world/world_items/item_types/room/Room';
import { World } from '../../../world/World';
import { NormalLightSwitcher } from './NormalLightSwitcher';


export class FlashingLightSwitcher implements LightSwitcher {
    private normalLightSwitcher: NormalLightSwitcher;

    constructor(normalLightSwitcher: NormalLightSwitcher) {
        this.normalLightSwitcher = normalLightSwitcher;
    }

    public on(room: Room, world: World): Promise<void> {
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
              if (done) { resolve(val); }
              else { Promise.resolve(value).then(iterate); }
            })()
        );

      }

    private *on2(room: Room, world: World) {
        // return new Promise((resolve) => {

            const generator = this.turnLightOnWithFlashing(room, world);
            while (true) {
                const {done} = generator.next();
                console.log('next')
                if (done) {
                    break;
                }
            }

            yield undefined;
        // });
    }

    public off(room: Room, world: World): Promise<void> {
        return null;
    }

    private *turnLightOnWithFlashing(room: Room, world: World) {
        yield this.normalLightSwitcher.on(room, world);
        yield this.sleep(room, world, 200);
        yield this.normalLightSwitcher.off(room, world);
        yield this.sleep(room, world, 200);
        yield this.normalLightSwitcher.on(room, world);
        yield this.sleep(room, world, 200);
        yield this.normalLightSwitcher.off(room, world);
        yield this.sleep(room, world, 200);
        yield this.normalLightSwitcher.on(room, world);
    }

    private sleep(room: Room, world: World, timeout: number): Promise<void> {
        return new Promise(resolve => {
            setTimeout(() => {console.log('timeout'); resolve(); }, timeout);
        });
    }
}
