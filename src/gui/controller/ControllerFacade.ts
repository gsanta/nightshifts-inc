import { ToolController } from './ToolController';
import { RenderController } from './RenderController';
import { GameController } from './GameController';
import { DebugController } from './DebugController';
import { UserController } from './UserController';
import { SettingsController } from './SettingsController';


export interface ControllerConfig {
    render(): void;
}

export class ControllerFacade {
    toolController: ToolController;
    renderController: RenderController;
    gameController: GameController;
    debugController: DebugController;
    userController: UserController;
    settingsController: SettingsController;

    constructor() {
        this.toolController = new ToolController(this);
        this.renderController = new RenderController();
        this.gameController = new GameController();
        this.debugController = new DebugController(this);
        this.userController = new UserController(this);
        this.settingsController = new SettingsController(this);
    }
}
