import * as React from 'react';
import { GameEngine } from '../../../game/GameEngine';
import {connect} from 'react-redux';
import { AppState } from '../../state/app/AppState';
import { World } from '../../../game/world/World';
import UpdateWorldActions from '../../state/game/actions/UpdateWorldActions';
import GetWorldActions from '../../state/game/actions/GetWorldActions';
import { ActionDispatcher } from '../../../game/actions/ActionDispatcher';
import colors from '../miscellaneous/colors';
import { Color4 } from 'babylonjs';
import SetWorldAction from '../../state/game/actions/SetWorldAction';
import { WorldFactoryProducer } from '../../../game/world/world_factory/WorldFactoryProducer';
import { JsonWorldSchema } from '../../../game/world/world_import/JsonWorldSchema';
import { WorldImporter } from '../../../game/world/world_import/WorldImporter';

const gwmGameWorldMap = require('../../../../assets/world_maps/new_world_map.gwm');

const mapStateToProps = (state: AppState) => {
    return {
        worldSchema: state.world,
        actionDispatcher: state.gameActionDispatcher
    };
};

const mapDispatchToProps = dispatch => ({
    loadGame: () => dispatch(GetWorldActions.request()),
    updateGame: (world: World) => dispatch(UpdateWorldActions.request(world)),
    setWorld: (world: World) => dispatch(SetWorldAction.request(world))
});

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

    public static getDerivedStateFromProps(props: GameProps, state: GameState) {

    }

    public componentDidMount() {
        this.props.loadGame();

        const canvas = this.state.canvasRef.current;
        const engine = new BABYLON.Engine(canvas);
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = Color4.FromHexString(colors.Black);
        this.setState({
            engine,
            scene
        });

        // const worldGenerator = new JsonWorldImporter(scene, canvas, new JsonMeshFactoryProducer());
        const worldGenerator = new WorldImporter(scene, canvas, new WorldFactoryProducer());
        worldGenerator
            .create(gwmGameWorldMap)
            .then((world) => {
                this.props.setWorld(world);
                this.gameEngine = new GameEngine(canvas, scene, engine, world, this.props.actionDispatcher);
                // this.gameEngine.runGame(JSON.stringify(jsonGameWorldMap));
                this.gameEngine.run();

                // this.intervalTimeout = setInterval(
                //     () => {
                //         this.props.updateGame(this.gameEngine.getWorld());
                //     },
                //     1000
                // );
            })
            .catch(e => console.error(e));


    }

    public componentDidUpdate() {
        const canvas = this.state.canvasRef.current;
        const scene = this.state.scene;

        // if (this.props.worldSchema && !this.gameEngine.isRunning()) {
        //     const worldGenerator = new JsonWorldImporter(scene, canvas, new JsonMeshFactoryProducer());
            // this.gameEngine.run(JSON.stringify(this.props.worldSchema));
        // }
    }

    public componentWillUnmount() {
        clearInterval(this.intervalTimeout);
    }

    public render() {
        return (
            <div>
                <canvas ref={this.state.canvasRef}></canvas>
                {/* <ApplicationSettingsDialog/> */}
                {/* <InventoryRoute/> */}
            </div>
        );
    }
}

export interface GameProps {
    loadGame(): void;
    updateGame(world: World): void;
    setWorld(world: World): void;
    worldSchema: JsonWorldSchema;
    actionDispatcher: ActionDispatcher;
}

export interface GameState {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    scene: BABYLON.Scene;
    engine: BABYLON.Engine;
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);

