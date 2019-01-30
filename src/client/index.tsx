import App from './gui/App';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import axios from 'axios';
import { HashRouter as Router } from 'react-router-dom';
import { GwmToJsonTransformerProgram } from '../game/io/json_world_io/export/GwmToJsonTransformerProgram';
import { GameEngine } from '../game/GameEngine';
import { TestControls } from './gui/test_page/TestControls';

export function render() {
    ReactDom.render(
        <Router>
            <App/>
        </Router>,
        document.getElementById('the-game-root')
    );
}


export const testRenderGame = (canvas: HTMLCanvasElement, jsonWorldPath: string) => {
    const gameEngine = new GameEngine(canvas);

    axios.get(jsonWorldPath)
        .then(response => {
            gameEngine.runGame(JSON.stringify(response.data));
        })
        .catch(e => console.error(e));

    return gameEngine;
};

export const renderTestControls = (div: HTMLDivElement, gameEngine: GameEngine) => {
    return ReactDom.render(
        <TestControls gameEngine={gameEngine} />,
        div
    );
};

export {GameEngine} from '../game/GameEngine';
export const gwmToJsonTransformerProgram = new GwmToJsonTransformerProgram();
export const testVar = 2;
