import * as React from 'react';
import * as ReactDom from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { addLocaleData } from 'react-intl';
import localeHu from 'react-intl/locale-data/hu';
import localeEn from 'react-intl/locale-data/en';
import App from './panels/App';
import { ControllerContext } from './panels/Context';
import { ControllerFacade } from '../controller/ControllerFacade';

addLocaleData([...localeEn, ...localeHu]);

const messagesHu = require('../../translations/hu.json');

const messages = {
    hu: messagesHu
};

const language = navigator.language.split(/[-_]/)[0];

export class Main extends React.Component<{}, {controllers: ControllerFacade}> {

    constructor(props: {}) {
        super(props);
        this.state = {
            controllers: new ControllerFacade()
        }
    }

    render() {
        return (
            <IntlProvider locale={language} messages={messages[language]}>
                <Router>
                <ControllerContext.Provider value={this.state.controllers}>

                    <App/>
                </ControllerContext.Provider>
                </Router>
            </IntlProvider>
        );
    }
}

export function render() {
    ReactDom.render(
        <Main/>,
        document.getElementById('the-game-root')
    );
}

export {GameEngine} from '../../game/GameEngine';
