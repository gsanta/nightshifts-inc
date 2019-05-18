import * as React from 'react';
import { connect, Provider } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { AppStore } from '../../state/app_state/AppStore';
import { AppLoadingState, AppState } from '../../state/app_state/AppState';
import { User } from '../../state/user_state/user_model/User';
import { ApplicationSettingsRoute } from '../dialogs/application_settings_dialog/ApplicationSettingsRoute';
import Game from './Game';
import Header from './Header';
import { InventoryRoute } from '../dialogs/inventory_dialog/InventoryRoute';
import { LoginRoute } from '../dialogs/login_dialog/LoginRoute';
import * as Mousetrap from 'mousetrap';
import { SignupRoute } from '../dialogs/signup_dialog/SignupRoute';
import { DebugRoute } from '../dialogs/debug_dialog/DebugRoute';
import '../../../translations/config';

const mapStateToProps = (state: AppState) => {
    return {
        user: state.settings.user,
        appLoadingState: state.appLoadingState,
    };
};

class App extends React.Component<any, AppComponentState> {

    constructor(props: any) {
        super(props);

        Mousetrap.bind('shift+i', () => {
            props.history.push('/inventory');
        });

        Mousetrap.bind('shift+d', () => {
            props.history.push('/debug');
        });

        this.state = {
            user: null
        };
    }

    public render() {
        if (this.shouldRedirectToLoginPage()) {
            this.props.history.push('/login');
        }

        return (
            <div>
                <Header/>

                <Route path="/" render={() => <Game openInventory={() => this.props.history.push('/inventory')} />}/>

                <Route exact path="/settings" component={ApplicationSettingsRoute}/>
                <Route exact path="/inventory" component={InventoryRoute}/>
                <Route exact path="/login" component={LoginRoute}/>
                <Route exact path="/signup" component={SignupRoute}/>
                <Route exact path="/debug" component={DebugRoute}/>
            </div>
        );
    }

    private shouldRedirectToLoginPage() {
        return this.props.appLoadingState !== 'loading' &&
            this.props.user === null &&
            this.props.history.location.pathname !== '/login' &&
            this.props.history.location.pathname !== '/signup';
    }
}


const RouterApp = withRouter(connect(mapStateToProps)(App));

export default () => {
    return (
        <Provider store={AppStore}>
            {/* <I18nextProvider i18n={config}> */}
                <RouterApp/>
            {/* </I18nextProvider> */}
        </Provider>
    );
};

export interface AppComponentState {
    user: User | null;
}

export interface AppProps {
    appLoadingState: AppLoadingState;
}

