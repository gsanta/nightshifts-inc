import * as React from 'react';
import { connect, Provider } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { User } from '../../state/settings_state/model/User';
import Game from './Game';
import Header from './Header';
import { InventoryRoute } from '../dialogs/inventory/InventoryRoute';
import { LoginRoute } from '../dialogs/login/LoginRoute';
import * as Mousetrap from 'mousetrap';
import { SignupRoute } from '../dialogs/signup/SignupRoute';
import { DebugRoute } from '../dialogs/debug/DebugRoute';
import '../../../translations/config';
import { ApplicationSettingsRoute } from '../dialogs/application_settings/ApplicationSettingsRoute';
import { AppStore } from '../../state/app_state/AppStore';
import { AppState, AppLoadingState } from '../../state/app_state/AppState';
import { ControllerFacade, ControllerConfig } from '../../controller/ControllerFacade';
import { render } from '../../index';
import { ControllerContext } from './Context';

const mapStateToProps = (state: AppState) => {
    return {
        user: state.settings.user,
        appLoadingState: state.appLoadingState,
    };
};


class App extends React.Component<any, AppComponentState> {
    static contextType = ControllerContext;
    context: ControllerFacade;

    componentDidMount() {
        this.context.renderController.setRender(() => this.forceUpdate());
    }


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

export default class TheApp extends React.Component<{}, {}> {
    render() {
        return (
            <Provider store={AppStore}>
                <RouterApp/>
            </Provider>
        );
    }
}

export interface AppComponentState {
    user: User | null;
}
