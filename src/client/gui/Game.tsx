import * as React from 'react';
import { GameEngine } from '../../game/GameEngine';
import { GwmWorldImporter } from '../../game/io/gwm_world_io/import/GwmWorldImporter';
import { GwmMeshFactoryProducer } from '../../game/io/gwm_world_io/import/factories/GwmMeshFactoryProducer';
import {connect} from 'react-redux';
import { AppState } from '../state/root/RootState';
import { JsonWorldImporter } from '../../game/io/json_world_io/import/JsonWorldImporter';
import { JsonMeshFactoryProducer } from '../../game/io/json_world_io/import/JsonMashFactoryProducer';
import { World } from '../../game/model/World';
import { JsonWorldSchema } from '../../game/io/json_world_io/import/JsonWorldSchema';
import UpdateWorldActions from '../state/game/actions/UpdateWorldActions';
import GetWorldActions from '../state/game/actions/GetWorldActions';
import { ActionDispatcher } from '../../game/actions/ActionDispatcher';
import { InventoryRoute } from './components/routes/inventory/InventoryRoute';
import ApplicationSettingsDialog from './components/dialogs/application_settings/ApplicationSettingsDialog';
const gwmGameWorldMap = require('../../../assets/world_maps/new_world_map.gwm');
const jsonGameWorldMap = require('../../../assets/world_maps/json/world_map_complex.json');

const mapStateToProps = (state: AppState) => {
    return {
        worldSchema: state.world
    };
};

const mapDispatchToProps = dispatch => ({
    loadGame: () => dispatch(GetWorldActions.request()),
    updateGame: (world: World) => dispatch(UpdateWorldActions.request(world))
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
        this.setState({
            engine,
            scene
        });

        // const worldGenerator = new JsonWorldImporter(scene, canvas, new JsonMeshFactoryProducer());
        const worldGenerator = new GwmWorldImporter(scene, canvas, new GwmMeshFactoryProducer());
        worldGenerator
            .create(gwmGameWorldMap)
            .then((world) => {
                this.gameEngine = new GameEngine(canvas, scene, engine, world, new ActionDispatcher(world));
                // this.gameEngine.runGame(JSON.stringify(jsonGameWorldMap));
                this.gameEngine.run();

                this.intervalTimeout = setInterval(
                    () => {
                        this.props.updateGame(this.gameEngine.getWorld());
                    },
                    1000
                );
            })
            .catch(e => console.error(e));


    }

    public componentDidUpdate() {
        const canvas = this.state.canvasRef.current;
        const scene = this.state.scene;

        if (this.props.worldSchema && !this.gameEngine.isRunning()) {
            const worldGenerator = new JsonWorldImporter(scene, canvas, new JsonMeshFactoryProducer());
            // this.gameEngine.run(JSON.stringify(this.props.worldSchema));
        }
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
    worldSchema: JsonWorldSchema;
}

export interface GameState {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    scene: BABYLON.Scene;
    engine: BABYLON.Engine;
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);

