import * as React from 'react';
import { connect, Provider } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { GlobalStore } from '../state/GlobalStore';
import { AppLoadingState, AppState } from '../state/root/RootState';
import { User } from '../state/user/User';
import { ApplicationSettingsRoute } from './components/routes/application_settings/ApplicationSettingsRoute';
import Game from './Game';
import Header from './header/Header';
import Login from './Login';
import Signup from './Signup';

require('bootstrap/dist/css/bootstrap.css');

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user,
        appLoadingState: state.appLoadingState,
    };
};

class App extends React.Component<any, AppComponentState> {
    private unlisten: any;

    constructor(props: any) {
        super(props);

        this.state = {
            user: User.NULL_USER_MODEL
        };
    }

    public componentWillUnmount() {
        this.unlisten();
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
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
            </div>
        );
    }

    private shouldRedirectToLoginPage() {
        return this.props.appLoadingState !== 'loading' &&
            this.props.user === User.NULL_USER_MODEL &&
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

