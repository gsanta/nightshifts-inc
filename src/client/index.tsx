import App from './gui/App';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import axios from 'axios';
import { HashRouter as Router } from 'react-router-dom';
import { GameEngine } from '../game/GameEngine';
import { TestControls } from './gui/test_page/TestControls';
import { JsonMeshFactoryProducer } from '../game/io/json_world_io/import/JsonMashFactoryProducer';
import { JsonWorldImporter } from '../game/io/json_world_io/import/JsonWorldImporter';
import { GwmWorldImporter } from '../game/io/gwm_world_io/import/GwmWorldImporter';
import { GwmMeshFactoryProducer } from '../game/io/gwm_world_io/import/factories/GwmMeshFactoryProducer';

export function render() {
    ReactDom.render(
        <Router>
            <App/>
        </Router>,
        document.getElementById('the-game-root')
    );
}


export const renderGameFromJsonInput = (canvas: HTMLCanvasElement, jsonWorldPath: string) => {
    const engine = new BABYLON.Engine(canvas);
    const scene = new BABYLON.Scene(engine);
    const worldGenerator = new JsonWorldImporter(scene, canvas, new JsonMeshFactoryProducer());

    const gameEngine = new GameEngine(canvas, scene, engine, worldGenerator);

    axios.get(jsonWorldPath)
        .then(response => {
            gameEngine.runGame(JSON.stringify(response.data));
        })
        .catch(e => console.error(e));

    return gameEngine;
};

export const renderGameFromGwmInput = (canvas: HTMLCanvasElement, gwmWorldPath: string) => {
    const engine = new BABYLON.Engine(canvas);
    const scene = new BABYLON.Scene(engine);
    const worldGenerator = new GwmWorldImporter(scene, canvas, new GwmMeshFactoryProducer());

    const gameEngine = new GameEngine(canvas, scene, engine, worldGenerator);

    axios.get(gwmWorldPath)
        .then(response => {
            gameEngine.runGame(response.data);
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
