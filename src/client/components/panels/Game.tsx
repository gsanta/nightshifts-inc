import * as React from 'react';
import { GameEngine } from '../../../game/GameEngine';
import {connect} from 'react-redux';
import { AppState } from '../../state/app_state/AppState';
import { World } from '../../../game/world/World';
import UpdateWorldActions from '../../state/world_state/world_actions/UpdateWorldActions';
import GetWorldActions from '../../state/world_state/world_actions/GetWorldActions';
import { ActionDispatcher } from '../../../game/actions/ActionDispatcher';
import colors from '../miscellaneous/colors';
import { Color4 } from '@babylonjs/core';
import SetWorldAction from '../../state/world_state/world_actions/SetWorldAction';
import { WorldFactoryProducer } from '../../../game/world/world_factory/WorldFactoryProducer';
import { JsonWorldSchema } from '../../../game/world/world_import/JsonWorldSchema';
import { WorldImporter } from '../../../game/world/world_import/WorldImporter';
import { Engine } from '@babylonjs/core';
import { Scene } from '@babylonjs/core';
import { HealthWidget } from '../widgets/health_widget/HealthWidget';
import styled from 'styled-components';
import WidgetAction from '../../state/world_state/world_actions/WidgetAction';

const gwmGameWorldMap = require('../../../../assets/world_maps/new_world_map.gwm');

const mapStateToProps = (state: AppState) => {
    return {
        world: state.world,
        actionDispatcher: state.gameActionDispatcher,
        widgetInfo: state.widgetInfo
    };
};

const mapDispatchToProps = dispatch => ({
    loadGame: () => dispatch(GetWorldActions.request()),
    updateGame: (world: World) => dispatch(UpdateWorldActions.request(world)),
    setWorld: (world: World) => dispatch(SetWorldAction.request(world)),
    setWidgetUpdate: (health: number) => dispatch(WidgetAction.request(health))
});

const WidgetContainer = styled.div`
    position: absolute;
    left: 5px;
    top: 45px;
`;

class Game extends React.Component<GameProps, GameState> {
    private gameEngine: GameEngine;
    private intervalTimeout: NodeJS.Timeout;

    constructor(props: GameProps) {
        super(props);

        this.state = {
            canvasRef: React.createRef(),
            engine: null,
            scene: null
        };
    }

    public componentDidMount() {
        this.props.loadGame();

        const canvas = this.state.canvasRef.current;
        const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
        const scene = new Scene(engine);
        scene.clearColor = Color4.FromHexString(colors.Black);
        this.setState({
            engine,
            scene
        });

        const worldGenerator = new WorldImporter(scene, new WorldFactoryProducer());
        worldGenerator
            .import(gwmGameWorldMap)
            .then((world) => {
                this.props.setWorld(world);

                this.props.actionDispatcher.registerActionHandler({
                    handle: (type: string, w: World) => {
                        this.props.setWidgetUpdate(w.player.health);
                    }
                });
                this.gameEngine = new GameEngine(canvas, scene, engine, world, this.props.actionDispatcher);
                this.gameEngine.run();
            })
            .catch(e => console.error(e));


    }

    public componentWillUnmount() {
        clearInterval(this.intervalTimeout);
    }

    public render() {
        return (
            <div>

                <canvas ref={this.state.canvasRef}></canvas>
                <WidgetContainer>
                    <HealthWidget health={this.props.widgetInfo}/>
                </WidgetContainer>
            </div>
        );
    }
}

export interface GameProps {
    loadGame(): void;
    updateGame(world: World): void;
    setWorld(world: World): void;
    world: World;
    widgetInfo: number;
    actionDispatcher: ActionDispatcher;
    setWidgetUpdate(health: number): void;
}

export interface GameState {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    scene: Scene;
    engine: Engine;
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);

