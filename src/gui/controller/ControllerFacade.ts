import { ToolController } from './ToolController';
import { RenderController } from './RenderController';


export interface ControllerConfig {
    render(): void;
}

export class ControllerFacade {
    toolController: ToolController;
    renderController: RenderController;

    constructor(config: ControllerConfig) {
        this.toolController = new ToolController(this);
        this.renderController = new RenderController(config.render);
    }


}
