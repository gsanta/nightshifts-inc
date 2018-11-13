import App from './gui/App';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

ReactDom.render(
    <Router>
        <App/>
    </Router>,
    document.getElementById('the-game-root')
);
