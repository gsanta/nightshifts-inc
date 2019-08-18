import { ToolController } from './ToolController';
import { RenderController } from './RenderController';
import { GameController } from './GameController';


export interface ControllerConfig {
    render(): void;
}

export class ControllerFacade {
    toolController: ToolController;
    renderController: RenderController;
    gameController: GameController;

    constructor() {
        this.toolController = new ToolController(this);
        this.renderController = new RenderController();
        this.gameController = new GameController();
    }
}
