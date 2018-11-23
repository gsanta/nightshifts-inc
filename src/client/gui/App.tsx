import * as React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import { UserStore } from '../stores/UserStore';
import Header from './header/Header';
import { RootRoute } from './routes/root/RootRoute';
import { UserActions } from '../stores/UserActions';
import { UserQuery } from '../query/user/UserQuery';
import Settings from './routes/settings/Settings';
import Sidebar from './Sidebar';
import { Game } from './Game';
import { withRouter } from 'react-router-dom';
import { AppStore } from '../stores/app/AppStore';
import { AppActions } from '../stores/app/AppActions';
import { TokenHandler } from '../query/TokenHandler';
import { User } from '../stores/User';
require('bootstrap/dist/css/bootstrap.css');

export const GlobalContext = React.createContext<GlobalProps>({
    userStore: null,
    userActions: null,
    appActions: null
});

export interface GlobalProps {
    userStore: UserStore | null;
    userActions: UserActions | null;
    appActions: AppActions | null;
}

class App extends React.Component<any, AppState> {
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
        });
        this.userStore.onChange(this.onUserStoreChange);
        this.appStore.onChange(this.onAppStoreChange);
        this.userActions.loadUser();
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
            <GlobalContext.Provider value={{userStore: this.userStore, userActions: this.userActions, appActions: this.appActions}}>
                    <div>
                        <Header openSidebar={this.openSidebar}/>
                        <Switch>
                            <Route exact path="/settings" component={Settings}/>
                            <Route component={Game}/>
                        </Switch>
                        <Sidebar isOpen={this.state.isSidebarOpen} isPermanent={this.state.isSidebarPermanent} close={this.closeSidebar}/>
                        <Route path="/" exact render={(props) => <RootRoute {...props} user={this.state.user}/>}/>
                        <Route path="/login" exact render={(props) => <Login {...props} user={this.state.user} setUser={this.setUser}/>}/>
                        <Route
                            path="/signup"
                            exact
                            render={(props) => <Signup {...props} user={this.state.user} setUser={this.setUser}/>}
                        />
                    </div>
            </GlobalContext.Provider>
        );
    }

    private shouldRedirectToLoginPage() {
        return this.appStore.getModel().getAppState() !== 'loading' &&
            this.userStore.getModel() === User.NULL_USER_MODEL &&
            this.props.history.location.pathname !== '/login';
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
}

export default withRouter(App);

export interface AppState {
    user: User | null;
    isSidebarOpen: boolean;
    isSidebarPermanent: boolean;
}
