import * as React from 'react';
import { GameEngine } from '../../game/GameEngine';
import { GwmWorldImporter } from '../../game/io/gwm_world_io/import/GwmWorldImporter';
import { GwmMeshFactoryProducer } from '../../game/io/gwm_world_io/import/factories/GwmMeshFactoryProducer';
import {connect} from 'react-redux';
import { loadGameRequest } from '../state/GameActions';
import { AppState } from '../state/AppState';
import { JsonWorldImporter } from '../../game/io/json_world_io/import/JsonWorldImporter';
import { JsonMeshFactoryProducer } from '../../game/io/json_world_io/import/JsonMashFactoryProducer';
const gwmGameWorldMap = require('../../../assets/world_maps/new_world_map.gwm');
const jsonGameWorldMap = require('../../../assets/world_maps/json/world_map_complex.json');

const mapStateToProps = (state: AppState, ownProps) => {
    return {
      world: state
    };
};

const mapDispatchToProps = dispatch => ({
    loadGame: () => dispatch(loadGameRequest())
});

class Game extends React.Component<GameProps, {}> {
    private ref: React.RefObject<HTMLCanvasElement>;
    private gameEngine: GameEngine;

    constructor(props: GameProps) {
        super(props);
        this.ref = React.createRef();
    }

    public componentDidMount() {
        this.props.loadGame();
        const canvas = this.ref.current;
        const engine = new BABYLON.Engine(this.ref.current);
        const scene = new BABYLON.Scene(engine);
        // const worldGenerator = new JsonWorldImporter(scene, canvas, new JsonMeshFactoryProducer());
        const worldGenerator = new GwmWorldImporter(scene, canvas, new GwmMeshFactoryProducer());
        this.gameEngine = new GameEngine(canvas, scene, engine, worldGenerator);
        // this.gameEngine.runGame(JSON.stringify(jsonGameWorldMap));
        this.gameEngine.runGame(gwmGameWorldMap);
    }

    public render() {
        return (
            <canvas ref={this.ref}></canvas>
        );
    }
}

export interface GameProps {
    loadGame(): void;
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);

