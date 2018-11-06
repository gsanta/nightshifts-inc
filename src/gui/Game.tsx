import * as React from 'react';
import { GameEngine } from '../game/GameEngine';


export class Game extends React.Component<{}, {}> {
    private ref: React.RefObject<HTMLCanvasElement>;

    constructor(props: {}) {
        super(props);
        this.ref = React.createRef();
    }

    public componentDidMount() {
        new GameEngine(this.ref.current!).runRenderLoop();
    }

    public render() {
        return (
            <canvas ref={this.ref}></canvas>
        );
    }
}
