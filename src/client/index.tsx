import App from './components/panels/App';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { addLocaleData } from 'react-intl';
import localeHu from 'react-intl/locale-data/hu';
import localeEn from 'react-intl/locale-data/en';

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

export {GameEngine} from '../game/GameEngine';
