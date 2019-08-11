import { GameObject } from '../model/game_objects/GameObject';
import { VectorModel } from '../model/core/VectorModel';
import { ServiceFacade } from './ServiceFacade';
import { World } from '../model/game_objects/World';
import { Axis, Space } from 'babylonjs';

export class PlayerService {
    private player: GameObject;
    private services: ServiceFacade;

    constructor(serviceFacade: ServiceFacade, world: World) {
        this.player = world.player;
        this.services = serviceFacade;
    }

    public move(delta: VectorModel) {
        const absolutePos = this.player.meshes[0].getAbsolutePosition();
        const pos = new VectorModel(absolutePos.x, absolutePos.y, absolutePos.z);
        this.player.setPosition(pos.add(delta));

        this.services.actionableObjectService.calcClosestActionableObject();
        this.services.activeRoomService.calcActiveRoomAtPoint(this.player.meshes[0].getAbsolutePosition());
    }

    public rotate(rotationDelta: number) {
        this.player.meshes[0].rotate(Axis.Y, rotationDelta, Space.WORLD);
        this.services.toolServices.activeTool.update();
    }

    public doAction() {
        this.services.actionableObjectService.activateClosestActionableObject();
    }
}