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
import { ActionDispatcher } from '../game/actions/ActionDispatcher';
import { World } from '../game/model/World';
import InventoryDialog from './gui/components/dialogs/inventory/InventoryDialog';
import { IntlProvider } from 'react-intl';

import { addLocaleData } from 'react-intl';
import * as localeHu from 'react-intl/locale-data/hu';
import * as localeEn from 'react-intl/locale-data/en';

addLocaleData([...localeEn, ...localeHu]);

const messagesHu = require('../translations/hu.json');

const messages = {
    hu: messagesHu
};

const language = navigator.language.split(/[-_]/)[0];

export function render() {
    ReactDom.render(
        <IntlProvider locale={language} messages={messages[language]}>
            <Router>
                <App/>
            </Router>
        </IntlProvider>,
        document.getElementById('the-game-root')
    );
}


export const renderGameFromJsonInput = (canvas: HTMLCanvasElement, jsonWorldPath: string): Promise<GameEngine> => {
    const engine = new BABYLON.Engine(canvas);
    const scene = new BABYLON.Scene(engine);
    const worldGenerator = new JsonWorldImporter(scene, canvas, new JsonMeshFactoryProducer());

    return new Promise((resolve, reject) => {
        axios.get(jsonWorldPath)
        .then(response => resolve(worldGenerator.create(JSON.stringify(response.data))))
        .catch(e => reject(e));
    })
    .then((world: World) => new GameEngine(canvas, scene, engine, world, new ActionDispatcher(world)));
};

export const renderGameFromGwmInput = (canvas: HTMLCanvasElement, gwmWorldPath: string): Promise<GameEngine> => {
    const engine = new BABYLON.Engine(canvas);
    const scene = new BABYLON.Scene(engine);
    const worldGenerator = new GwmWorldImporter(scene, canvas, new GwmMeshFactoryProducer());

    return new Promise((resolve, reject) => {
        axios.get(gwmWorldPath)
        .then(response => resolve(worldGenerator.create(response.data)))
        .catch(e => reject(e));
    })
    .then((world: World) => new GameEngine(canvas, scene, engine, world, new ActionDispatcher(world)));
};


export const renderTestControls = (div: HTMLDivElement, gameEngine: GameEngine) => {
    return ReactDom.render(
        <TestControls gameEngine={gameEngine} />,
        div
    );
};

export {GameEngine} from '../game/GameEngine';

export const renderDialog = (root: HTMLDivElement, options: {headerColor: string, bodyColor: string, headerBorderColor: string}) => {
    ReactDom.render(
        <InventoryDialog tools={[]} grabTool={() => null}/>,
        root
    );
};
