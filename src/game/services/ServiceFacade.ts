import { World } from '../world/World';
import { PlayerService } from './PlayerService';
import { KeyboardHandler } from './KeyboardHandler';
import { ToolService } from './ToolService';
import { ActiveRoomService } from './active_room/ActiveRoomService';
import { ActionableObjectService } from './ActionableObjectService';
import { DebugServices } from './DebugServices';
import { ManualMotionStrategy } from './motion/ManualMotionStrategy';
import { EnemyCreationService } from './EnemyCreationService';

export class ServiceFacade {
    private world: World;
    public activeRoomService: ActiveRoomService;
    public playerService: PlayerService;
    public enemyCreationService: EnemyCreationService;
    public actionableObjectService: ActionableObjectService;
    public debugServices: DebugServices;
    public toolServices: ToolService;
    public keyboardHandler: KeyboardHandler;

    constructor(world: World) {
        this.activeRoomService = new ActiveRoomService(world);
        this.playerService = new PlayerService(this, world);
        this.enemyCreationService = new EnemyCreationService(world);
        this.keyboardHandler = new KeyboardHandler(this, new ManualMotionStrategy(world.player, world.scene), world);
        this.actionableObjectService = new ActionableObjectService(world);
        this.debugServices = new DebugServices(this, world);
        this.toolServices = new ToolService(world);
    }
}