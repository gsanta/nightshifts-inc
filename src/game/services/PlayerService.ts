import { GameObject } from '../model/game_objects/GameObject';
import { VectorModel } from '../model/core/VectorModel';
import { ServiceFacade } from './ServiceFacade';
import { World } from '../model/game_objects/World';

export class PlayerService {
    private player: GameObject;
    private serviceFacade: ServiceFacade;

    constructor(serviceFacade: ServiceFacade, world: World) {
        this.player = world.player;
        this.serviceFacade = serviceFacade;
    }

    public move(delta: VectorModel) {
        const absolutePos = this.player.meshes[0].getAbsolutePosition();
        const pos = new VectorModel(absolutePos.x, absolutePos.y, absolutePos.z);
        this.player.setPosition(pos.add(delta));

        this.serviceFacade.actionableObjectService.calcClosestActionableObject();
        this.serviceFacade.activeRoomService.calcActiveRoomAtPoint(this.player.meshes[0].getAbsolutePosition());
    }

    public doAction() {
        this.serviceFacade.actionableObjectService.activateClosestActionableObject();
    }
}