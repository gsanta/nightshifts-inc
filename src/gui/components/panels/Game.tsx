import * as React from 'react';
import { GameEngine } from '../../../game/GameEngine';
import {connect} from 'react-redux';
import { World } from '../../../game/model/game_objects/World';
import colors from '../miscellaneous/colors';
import { Color4, CannonJSPlugin, Vector3, OimoJSPlugin, PhysicsViewer } from 'babylonjs';
import { WorldImporter } from '../../../game/import/WorldImporter';
import { Engine } from 'babylonjs';
import { Scene } from 'babylonjs';
import { HealthWidget } from '../widgets/health_widget/HealthWidget';
import styled from 'styled-components';
import { Widgetbar } from '../widgets/Widgetbar';
import { ToolIcon } from '../dialogs/inventory/tools_icons/ToolIcon';
import { ToolWidget } from '../widgets/tool_widget/ToolWidget';
import ActivateToolActions from '../../state/tools_state/tools_actions/ActivateToolActions';
import DeactivateToolActions from '../../state/tools_state/tools_actions/DeactivateToolActions';
import { WorldSetup } from '../../../game/setup/WorldSetup';
import { CameraSetup } from '../../../game/setup/CameraSetup';
import { MainLightSetup } from '../../../game/setup/MainLightSetup';
import { ServiceFacade } from '../../../game/services/ServiceFacade';
import { AppState } from '../../state/app_state/AppState';
import GetWorldActions from '../../state/world_state/world_actions/GetWorldActions';
import UpdateWorldActions from '../../state/world_state/world_actions/UpdateWorldActions';
import SetWorldAction from '../../state/world_state/world_actions/SetWorldAction';
import WidgetAction from '../../state/world_state/world_actions/WidgetAction';

const gwmGameWorldMap = require('../../../../assets/world_maps/new_world_map.gwm');

const mapStateToProps = (state: AppState) => {
    return {
        world: state.world,
        services: state.services,
        widgetInfo: state.widgetInfo,
        tools: state.tools
    };
};

const mapDispatchToProps = dispatch => ({
    loadGame: () => dispatch(GetWorldActions.request()),
    updateGame: (world: World) => dispatch(UpdateWorldActions.request(world)),
    setWorld: (world: World, services: ServiceFacade) => dispatch(SetWorldAction.request(world, services)),
    setWidgetUpdate: (health: number) => dispatch(WidgetAction.request(health)),
    activateTool: (tool: ToolIcon) => dispatch(ActivateToolActions.request(tool)),
    deactivateTool: (tool: ToolIcon) => dispatch(DeactivateToolActions.request(tool)),
});

const WidgetContainer = styled.div`
    position: absolute;
    left: 5px;
    top: 45px;
`;

class Game extends React.Component<GameProps, GameState> {
    private intervalTimeout: NodeJS.Timeout;
    private isInitialized = false;
    private services: ServiceFacade;

    constructor(props: GameProps) {
        super(props);

        this.state = {
            canvasRef: React.createRef(),
            gameEngine: null,
            scene: null
        };
    }

    public componentDidMount() {
        this.props.loadGame();

        const canvas = this.state.canvasRef.current;
        const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
        const scene = new Scene(engine);
        // (window as any).physicsViewer = new PhysicsViewer(scene);
        // scene.enablePhysics(new Vector3(0, -10, 0), new OimoJSPlugin());
        scene.clearColor = Color4.FromHexString(colors.Black);
        this.setState({
            scene
        });

        const worldImporter = new WorldImporter(scene);
        worldImporter
            .import(gwmGameWorldMap)
            .then((world) => {
                const worldSetup = new WorldSetup(new CameraSetup(), new MainLightSetup());
                world = worldSetup.setup(world);
                this.services = new ServiceFacade(world, {openInventory: this.props.openInventory});
                this.props.setWorld(world, this.services);


                document.addEventListener('keydown', (event: KeyboardEvent) => this.services.keyboardHandler.onKeyDown(event));
                document.addEventListener('keyup', (event: KeyboardEvent) => this.services.keyboardHandler.onKeyUp(event));

                const gameEngine = new GameEngine(canvas, scene, engine, world);
                gameEngine.run();
                this.setState({
                    gameEngine
                });
            })
            .catch(e => console.error(e));
    }

    public componentDidUpdate() {
        if (!this.isInitialized && this.state.gameEngine) {
            this.isInitialized = true;

        }
    }

    public componentWillUnmount() {
        // clearInterval(this.intervalTimeout);
    }

    public render() {
        const widgets = this.props.tools
            .filter(tool => tool.isCarrying)
            .map(tool => <ToolWidget
                    onClick={t => t.isActive ? this.props.deactivateTool(t) : this.props.activateTool(t)}
                    tool={tool}
                />
            );

        return (
            <div>

                <canvas ref={this.state.canvasRef}></canvas>
                <WidgetContainer>
                    <HealthWidget health={this.props.widgetInfo}/>
                </WidgetContainer>
                <Widgetbar>{widgets}</Widgetbar>
            </div>
        );
    }
}

export interface GameProps {
    loadGame(): void;
    updateGame(world: World): void;
    setWorld(world: World, services: ServiceFacade): void;
    world: World;
    tools: ToolIcon[];
    widgetInfo: number;
    setWidgetUpdate(health: number): void;
    openInventory(): void;
    activateTool(tool: ToolIcon): void;
    deactivateTool(tool: ToolIcon): void;
}

export interface GameState {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    scene: Scene;
    gameEngine: GameEngine;
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);

