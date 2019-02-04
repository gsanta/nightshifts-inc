import * as React from 'react';
import { GameEngine } from '../../game/GameEngine';
import { GwmWorldImporter } from '../../game/io/gwm_world_io/import/GwmWorldImporter';
import { GwmMeshFactoryProducer } from '../../game/io/gwm_world_io/import/factories/GwmMeshFactoryProducer';
const jsonGameWorldMap = require('../../../assets/world_maps/json/world_map_basic.json');
const gwmGameWorldMap = require('../../../assets/world_maps/new_world_map.gwm');

export class Game extends React.Component<{}, {}> {
    private ref: React.RefObject<HTMLCanvasElement>;
    private gameEngine: GameEngine;

    constructor(props: {}) {
        super(props);
        this.ref = React.createRef();
    }

    public componentDidMount() {
        const canvas = this.ref.current;
        const engine = new BABYLON.Engine(this.ref.current);
        const scene = new BABYLON.Scene(engine);
        const worldGenerator = new GwmWorldImporter(scene, canvas, new GwmMeshFactoryProducer());
        this.gameEngine = new GameEngine(canvas, scene, engine, worldGenerator);
        this.gameEngine.runGame(gwmGameWorldMap);
    }

    public render() {
        return (
            <canvas ref={this.ref}></canvas>
        );
    }
}
