import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Header from './header/Header';
import { RootRoute } from './routes/root/RootRoute';
import { loginFacebookRequest, signupRequest, loginRequest, clearErrors } from '../state/user/UserActions';
import { UserQuery } from '../query/user/UserQuery';
import Settings from './routes/settings/Settings';
import Sidebar from './Sidebar';
import Game from './Game';
import { withRouter } from 'react-router-dom';
import { User } from '../stores/User';
import { Provider, connect } from 'react-redux';
import { GlobalStore } from '../state/GlobalStore';
import { AppState, AppLoadingState } from '../state/AppState';
import { ErrorMessage } from './ErrorMessage';

require('bootstrap/dist/css/bootstrap.css');

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user,
        userQuery: state.query.user,
        appLoadingState: state.appLoadingState,
        errors: state.errors
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginFacebook: (accessToken: string) => dispatch(loginFacebookRequest(accessToken)),
        signup: (email: string, password: string) => dispatch(signupRequest(email, password)),
        login: (email: string, password: string) => dispatch(loginRequest(email, password)),
        clearErrors: () => dispatch(clearErrors())
    };
};


class App extends React.Component<any, AppComponentState> {
    private unlisten: any;

    constructor(props: any) {
        super(props);

        this.closeSidebar = this.closeSidebar.bind(this);
        this.openSidebar = this.openSidebar.bind(this);
        this.onAppStoreChange = this.onAppStoreChange.bind(this);


        this.state = {
            user: User.NULL_USER_MODEL,
            isSidebarOpen: false,
            isSidebarPermanent: props.history.location.pathname === '/settings' ? true : false
        };
    }

    public componentDidMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            if (location.pathname === '/settings') {
                this.setState({
                    isSidebarOpen: true,
                    isSidebarPermanent: true
                });
            } else if (location.pathname === '/login') {
                this.setState({
                    isSidebarPermanent: false,
                    isSidebarOpen: false,
                });
            } else {
                this.setState({
                    isSidebarPermanent: false
                });
            }

            this.props.clearErrors();
        });
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
                <Header openSidebar={this.openSidebar}/>
                <Switch>
                    <Route exact path="/settings" component={Settings}/>
                    <Route component={Game}/>
                </Switch>
                <Sidebar isOpen={this.state.isSidebarOpen} isPermanent={this.state.isSidebarPermanent} close={this.closeSidebar}/>
                <Route path="/" exact render={(props) => <RootRoute {...props} user={this.state.user}/>}/>
                <Route
                    path="/login"
                    exact
                    render={
                        (props) => {
                            return (
                                <Login
                                    {...props}
                                    user={this.props.user}
                                    login={this.props.login}
                                    loginFacebook={(accessToken: string) => this.props.loginFacebook(accessToken)}
                                    errors={this.props.errors}
                                />
                            );
                        }
                    }
                />
                <Route
                    path="/signup"
                    exact
                    render={
                        (props) => {
                            return (
                                <Signup
                                    {...props}
                                    signup={this.props.signup}
                                    signupFacebook={(accessToken: string) => this.props.loginFacebook(accessToken)}
                                    user={this.props.user}
                                    errors={this.props.errors}
                                />
                            );
                        }
                    }
                />
            </div>
        );
    }

    private shouldRedirectToLoginPage() {
        return this.props.appLoadingState !== 'loading' &&
            this.props.user === User.NULL_USER_MODEL &&
            this.props.history.location.pathname !== '/login' &&
            this.props.history.location.pathname !== '/signup';
    }

    private onAppStoreChange() {
        this.forceUpdate();
    }

    private closeSidebar() {
        if (this.props.history.location.pathname !== '/settings') {
            this.setState({
                isSidebarOpen: false
            });
        }
    }

    private openSidebar() {
        this.setState({
            isSidebarOpen: true
        });
    }
}


const RouterApp = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export default () => {
    return (
        <Provider store={GlobalStore}>
            <RouterApp/>
        </Provider>
    );
};

export interface AppComponentState {
    user: User | null;
    isSidebarOpen: boolean;
    isSidebarPermanent: boolean;
}

export interface AppProps {
    loginFacebook(accessToken: string): void;
    signup(email: string, password: string): void;
    appLoadingState: AppLoadingState;
    errors: ErrorMessage[];
    clearErrors(): void;
}

