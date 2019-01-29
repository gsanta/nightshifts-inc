import App from './gui/App';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { GwmToJsonTransformerProgram } from '../game/io/json_world_serializer/serialize/GwmToJsonTransformerProgram';

export function render() {
    ReactDom.render(
        <Router>
            <App/>
        </Router>,
        document.getElementById('the-game-root')
    );
}

export const gwmToJsonTransformerProgram = new GwmToJsonTransformerProgram();
export const testVar = 2;
