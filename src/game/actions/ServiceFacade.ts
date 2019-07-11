import { ActiveRoomService } from './ActiveRoomService';
import { World } from '../world/World';
import { PlayerService } from './PlayerService';
import { KeyboardHandler } from './KeyboardHandler';
import { ManualMotionStrategy } from './motion_actions/ManualMotionStrategy';

export class ServiceFacade {
    private world: World;
    public activeRoomService: ActiveRoomService;
    public playerService: PlayerService;
    public keyboardHandler: KeyboardHandler;

    constructor(world: World) {
        this.activeRoomService = new ActiveRoomService(world);
        this.playerService = new PlayerService(this, world);
        this.keyboardHandler = new KeyboardHandler(this, new ManualMotionStrategy(world.player, world.scene), world);
    }
}