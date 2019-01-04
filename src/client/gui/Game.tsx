import * as React from 'react';
import { GameEngine } from '../../game/GameEngine';
import { GameObjectParser } from 'game-worldmap-generator';
const gameWorldMap = require('../../game/game_map_creator/new_world_map.gwm');

export class Game extends React.Component<{}, {}> {
    private ref: React.RefObject<HTMLCanvasElement>;
    private gameEngine: GameEngine;

    constructor(props: {}) {
        super(props);
        this.ref = React.createRef();
    }

    public componentDidMount() {
        this.gameEngine = new GameEngine(this.ref.current!);

        const gameObjectParser = new GameObjectParser();

        this.gameEngine.runGame(gameWorldMap)
    }

    public render() {
        return (
            <canvas ref={this.ref}></canvas>
        );
    }
}
