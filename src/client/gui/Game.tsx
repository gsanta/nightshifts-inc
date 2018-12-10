import * as React from 'react';
import { GameEngine } from '../../game/GameEngine';
import { GameObjectParser } from '../../game/game_object_parser/GameObjectParser';
import { GameMapCreator } from '../../game/game_map_creator/GameMapCreator';

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

        gameObjectParser.parse(
            `######
            #WWWWW
            #W#W##
            ######`
        )
        .then(gameObjects => {
            const gameMapCreator = new GameMapCreator()
        })
        .catch(e => done(e));
    }

    public render() {
        return (
            <canvas ref={this.ref}></canvas>
        );
    }
}
