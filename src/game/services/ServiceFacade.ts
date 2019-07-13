import { World } from '../world/World';
import { PlayerService } from './PlayerService';
import { KeyboardHandler } from './KeyboardHandler';
import { ToolService } from './ToolService';
import { ActiveRoomService } from '../actions/ActiveRoomService';
import { ActionableObjectService } from '../actions/ActionableObjectService';
import { DebugServices } from '../actions/DebugServices';
import { ManualMotionStrategy } from './motion/ManualMotionStrategy';

export class ServiceFacade {
    private world: World;
    public activeRoomService: ActiveRoomService;
    public playerService: PlayerService;
    public actionableObjectService: ActionableObjectService;
    public debugServices: DebugServices;
    public toolServices: ToolService;
    public keyboardHandler: KeyboardHandler;

    constructor(world: World) {
        this.activeRoomService = new ActiveRoomService(world);
        this.playerService = new PlayerService(this, world);
        this.keyboardHandler = new KeyboardHandler(this, new ManualMotionStrategy(world.player, world.scene), world);
        this.actionableObjectService = new ActionableObjectService(world);
        this.debugServices = new DebugServices(this, world);
        this.toolServices = new ToolService(world);
    }
}