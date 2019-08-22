import { World } from '../model/game_objects/World';
import { PlayerService } from './PlayerService';
import { KeyboardHandler } from './KeyboardHandler';
import { ToolService } from './ToolService';
import { RoomService } from './active_room/RoomService';
import { ActionableObjectService } from './ActionableObjectService';
import { DebugServices } from './DebugServices';
import { ManualMotionStrategy } from './motion/ManualMotionStrategy';
import { EnemyCreationService } from './EnemyCreationService';

export interface ServiceOptions {
    openInventory(): void;
}

export const defaultServiceOptions: ServiceOptions = {
    openInventory: () => null
}

export class ServiceFacade {
    private world: World;
    public activeRoomService: RoomService;
    public playerService: PlayerService;
    public enemyCreationService: EnemyCreationService;
    public actionableObjectService: ActionableObjectService;
    public debugServices: DebugServices;
    public toolServices: ToolService;
    public keyboardHandler: KeyboardHandler;

    constructor(world: World, options: Partial<ServiceOptions> = {}) {
        options = {...defaultServiceOptions, ...options};

        this.activeRoomService = new RoomService(world);
        this.playerService = new PlayerService(this, world);
        this.enemyCreationService = new EnemyCreationService(world);
        this.keyboardHandler = new KeyboardHandler(this, new ManualMotionStrategy(world.player, world.scene), world);
        this.actionableObjectService = new ActionableObjectService(this, world);
        this.debugServices = new DebugServices(this, world);
        this.toolServices = new ToolService(world, options.openInventory);
    }
}