import { World } from '../model/game_objects/World';
import { GameObject } from '../model/game_objects/GameObject';
import { LightSwitcher } from './active_room/LightSwitcher';
import { NormalLightSwitcher } from './active_room/NormalLightSwitcher';
import { ServiceFacade } from './ServiceFacade';

export class DebugServices {
    private world: World;
    private services: ServiceFacade;
    private lightSwitcher: LightSwitcher;

    constructor(services: ServiceFacade, world: World) {
        this.services = services;
        this.world = world;
        this.lightSwitcher = new NormalLightSwitcher();
    }

    public displayRoofs() {
        this.services.activeRoomService.isShowRoofs = true;
        this.services.activeRoomService.calcActiveRoomAtPoint(this.world.player.meshes[0].getAbsolutePosition());
    }

    public hideRoofs() {
        this.world.getWorldItemsByType('room')
            .forEach((room: GameObject) => {
                room.children.filter(child => child.type === 'room-label').forEach(roomLabel => roomLabel.meshes[0].isVisible = false);
            });
        this.services.activeRoomService.isShowRoofs = false;
    }

    public displayBoundingBoxes() {
        this.world.config.displayBoundingBoxes = true;
        this.world.worldItems.forEach(item => {
            if (item.boundingMesh) {
                item.boundingMesh.isVisible = true;
            }
        });
    }

    public hideBoundingBoxes() {
        this.world.config.displayBoundingBoxes = false;
        this.world.worldItems.forEach(item => {
            if (item.boundingMesh) {
                item.boundingMesh.isVisible = false;
            }
        });
    }

    public turnOnAllLights() {
        this.world.getWorldItemsByType('room').forEach(room => {
            this.lightSwitcher.on(<GameObject> room, this.world);
        });
    }

    public turnOffAllLights() {
        this.world.getWorldItemsByType('room').forEach(room => {
            this.lightSwitcher.off(<GameObject> room, this.world);
        });
    }
}
