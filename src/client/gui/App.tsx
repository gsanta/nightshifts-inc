import * as React from 'react';
import { connect, Provider } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { GlobalStore } from '../state/GlobalStore';
import { AppLoadingState, AppState } from '../state/root/RootState';
import { User } from '../state/user/User';
import { ApplicationSettingsRoute } from './components/routes/application_settings/ApplicationSettingsRoute';
import Game from './Game';
import Header from './header/Header';
import { InventoryRoute } from './components/routes/inventory/InventoryRoute';
import { LoginRoute } from './components/routes/login_route/LoginRoute';
import { SignupRoute } from './components/routes/signup_route/SignupRoute';

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user,
        appLoadingState: state.appLoadingState,
    };
};

class App extends React.Component<any, AppComponentState> {

    constructor(props: any) {
        super(props);

        this.state = {
            user: null
        };
    }

    public render() {
        if (this.shouldRedirectToLoginPage()) {
            return <Redirect to="/login"/>;
        }

        return (
            <div>
                <Header/>

                <Game/>

                <Route exact path="/settings" component={ApplicationSettingsRoute}/>
                <Route exact path="/inventory" component={InventoryRoute}/>
                <Route exact path="/login" component={LoginRoute}/>
                <Route exact path="/signup" component={SignupRoute}/>
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
        <Provider store={GlobalStore}>
            <RouterApp/>
        </Provider>
    );
};

export interface AppComponentState {
    user: User | null;
}

export interface AppProps {
    appLoadingState: AppLoadingState;
}

