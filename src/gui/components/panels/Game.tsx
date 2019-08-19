import { Color4, Engine, Scene } from 'babylonjs';
import * as React from 'react';
import styled from 'styled-components';
import { GameEngine } from '../../../game/GameEngine';
import { WorldImporter } from '../../../game/import/WorldImporter';
import { ServiceFacade } from '../../../game/services/ServiceFacade';
import { CameraSetup } from '../../../game/setup/CameraSetup';
import { MainLightSetup } from '../../../game/setup/MainLightSetup';
import { WorldSetup } from '../../../game/setup/WorldSetup';
import { ControllerFacade } from '../../controller/ControllerFacade';
import colors from '../miscellaneous/colors';
import { HealthWidget } from '../widgets/health_widget/HealthWidget';
import { Widgetbar } from '../widgets/Widgetbar';
import { ControllerContext } from './Context';

const gwmGameWorldMap = require('../../../../assets/world_maps/new_world_map.gwm');

const WidgetContainer = styled.div`
    position: absolute;
    left: 5px;
    top: 45px;
`;

class Game extends React.Component<GameProps, GameState> {
    // static contextTyp  = ControllerContext;
    private intervalTimeout: NodeJS.Timeout;
    private isInitialized = false;
    private services: ServiceFacade;
    context: ControllerFacade;

    constructor(props: GameProps) {
        super(props);

        this.state = {
            canvasRef: React.createRef(),
            gameEngine: null,
            scene: null
        };
    }

    public componentDidMount() {
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
                this.context.gameController.setGameServices(this.services);

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
        return (
            <div>
                <canvas ref={this.state.canvasRef}></canvas>
                <WidgetContainer>
                    <HealthWidget health={80}/>
                </WidgetContainer>
                <Widgetbar/>
            </div>
        );
    }
}

Game.contextType = ControllerContext;
export interface GameProps {
    openInventory(): void;
}

export interface GameState {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    scene: Scene;
    gameEngine: GameEngine;
}

export default Game;

