import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Header from './header/Header';
import { RootRoute } from './routes/root/RootRoute';
import ClearErrorActions from '../state/root/actions/ClearErrorActions';
import { UserQuery } from '../query/user/UserQuery';
import Settings from './routes/settings/Settings';
import Sidebar from './Sidebar';
import Game from './Game';
import { withRouter } from 'react-router-dom';
import { User } from '../state/user/User';
import { Provider, connect } from 'react-redux';
import { GlobalStore } from '../state/GlobalStore';
import { AppState, AppLoadingState } from '../state/root/RootState';
import { ErrorMessage } from './ErrorMessage';
import LoginFacebookActions from '../state/user/actions/LoginFacebookActions';
import SignupActions from '../state/user/actions/SignupActions';
import LoginActions from '../state/user/actions/LoginActions';

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
        loginFacebook: (accessToken: string) => dispatch(LoginFacebookActions.request(accessToken)),
        signup: (email: string, password: string) => dispatch(SignupActions.request({email, password})),
        login: (email: string, password: string) => dispatch(LoginActions.request({email, password})),
        clearErrors: () => dispatch(ClearErrorActions.request())
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
                <Sidebar isOpen={this.state.isSidebarOpen} isPermanent={this.state.isSidebarPermanent} close={this.closeSidebar}/>

                <Route exact path="/settings" component={Settings}/>
                <Route exact path="/" component={Game}/>
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

