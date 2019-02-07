import * as React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import { UserStore } from '../stores/UserStore';
import Header from './header/Header';
import { RootRoute } from './routes/root/RootRoute';
import { UserActions, loginFacebook, loginFacebookRequest, signupRequest } from '../stores/UserActions';
import { UserQuery } from '../query/user/UserQuery';
import Settings from './routes/settings/Settings';
import Sidebar from './Sidebar';
import Game from './Game';
import { withRouter } from 'react-router-dom';
import { AppStore } from '../stores/app/AppStore';
import { AppActions } from '../stores/app/AppActions';
import { TokenHandler } from '../query/TokenHandler';
import { User } from '../stores/User';
import { Provider, connect } from 'react-redux';
import { GlobalStore } from '../state/GlobalStore';
import { AppState, AppLoadingState } from '../state/AppState';
import { sign } from 'jsonwebtoken';

require('bootstrap/dist/css/bootstrap.css');

export const GlobalContext = React.createContext<GlobalProps>({
    userStore: null,
    userActions: null,
    appActions: null,
    appStore: null
});

const mapStateToProps = (state: AppState, ownProps: {userQuery: UserQuery}) => {
    return {
        user: state.user,
        userQuery: state.query.user,
        appLoadingState: state.appLoadingState
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loginFacebookDispatch: (accessToken: string, userQuery: UserQuery) => dispatch(loginFacebookRequest(accessToken, userQuery)),
        signupDispatch: (email: string, password: string, userQuery: UserQuery) => dispatch(signupRequest(email, password, userQuery))
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...ownProps,
        ...{
            user: stateProps.user,
            appLoadingState: stateProps.appLoadingState
        },
        ...{
            loginFacebook: (accessToken: string) => dispatchProps.loginFacebookDispatch(accessToken, stateProps.userQuery),
            signup: (email: string, password: string) => dispatchProps.signupDispatch(email, password, stateProps.userQuery)
        }
    };
};

export interface GlobalProps {
    userStore: UserStore | null;
    userActions: UserActions | null;
    appActions: AppActions | null;
    appStore: AppStore | null;
}

class App extends React.Component<any, AppComponentState> {
    private userStore: UserStore;
    private appStore: AppStore;
    private userActions: UserActions;
    private appActions: AppActions;
    private unlisten: any;

    constructor(props: any) {
        super(props);

        this.onUserStoreChange = this.onUserStoreChange.bind(this);
        this.setUser = this.setUser.bind(this);
        this.closeSidebar = this.closeSidebar.bind(this);
        this.openSidebar = this.openSidebar.bind(this);
        this.onAppStoreChange = this.onAppStoreChange.bind(this);
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);

        this.userStore = new UserStore();
        this.appStore = new AppStore();
        this.userActions = new UserActions(this.userStore, this.appStore, new UserQuery());
        this.appActions = new AppActions(this.userStore, new TokenHandler());

        this.state = {
            user: this.userStore.getModel(),
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

            this.appActions.clearErrors();
        });
        this.userStore.onChange(this.onUserStoreChange);
        this.appStore.onChange(this.onAppStoreChange);
        // this.userActions.loadUser();
    }

    public componentWillUnmount() {
        this.unlisten();
        this.userStore.offChange(this.onUserStoreChange);
        this.appStore.offChange(this.onAppStoreChange);
    }

    public render() {
        if (this.shouldRedirectToLoginPage()) {
            return <Redirect to="/login"/>;
        }

        return (
            <GlobalContext.Provider value={{userStore: this.userStore, userActions: this.userActions, appActions: this.appActions, appStore: this.appStore}}>
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
                                            login={this.login}
                                            loginFacebook={(accessToken: string) => this.props.loginFacebook(accessToken)}
                                            errors={this.userStore.getErrors()}
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
                                            user={this.state.user}
                                            errors={this.userStore.getErrors()}
                                        />
                                    );
                                }
                            }
                        />
                    </div>
            </GlobalContext.Provider>
        );
    }

    private shouldRedirectToLoginPage() {
        return this.props.appLoadingState !== 'loading' &&
            this.props.user === User.NULL_USER_MODEL &&
            this.props.history.location.pathname !== '/login' &&
            this.props.history.location.pathname !== '/signup';
    }

    private onUserStoreChange() {
        this.setState({
            user: this.userStore.getModel()
        });
    }

    private onAppStoreChange() {
        this.forceUpdate();
    }

    private setUser(user: User) {
        this.userStore.setModel(user);
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

    private login(email: string, password: string) {
        // this.userActions.login(email, password);
    }

    private signup(email: string, password: string) {
        // this.userActions.signup(email, password);
    }
}


const RouterApp = withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(App));

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
}

