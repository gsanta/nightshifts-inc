import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import { UserStore } from '../stores/UserStore';
import { UserModel } from '../stores/UserModel';
import Header from './header/Header';
import { RootRoute } from './routes/root/RootRoute';
import { UserActions } from '../stores/UserActions';
import { UserQuery } from '../query/user/UserQuery';
import { Settings } from './routes/settings/Settings';
import Sidebar from './Sidebar';
import { Game } from './Game';
import { withRouter } from 'react-router-dom';
require('bootstrap/dist/css/bootstrap.css');

export const GlobalContext = React.createContext<GlobalProps>({
    userStore: null,
    userActions: null
});

export interface GlobalProps {
    userStore: UserStore | null;
    userActions: UserActions | null;
}

class App extends React.Component<any, AppState> {
    private userStore: UserStore;
    private userActions: UserActions;
    private unlisten: any;

    constructor(props: any) {
        super(props);

        this.onUserStoreChange = this.onUserStoreChange.bind(this);
        this.setUser = this.setUser.bind(this);
        this.closeSidebar = this.closeSidebar.bind(this);
        this.openSidebar = this.openSidebar.bind(this);

        this.userStore = new UserStore();
        this.userActions = new UserActions(this.userStore, new UserQuery());

        this.state = {
            user: null,
            isSidebarOpen: props.history.location.pathname === '/settings' ? true : false
        };
    }

    public componentDidMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            if (location.pathname === '/settings') {
                this.setState({
                    isSidebarOpen: true
                });
            }
        });
        this.userStore.onChange(this.onUserStoreChange);
    }

    public componentWillUnmount() {
        this.unlisten();
        this.userStore.offChange(this.onUserStoreChange);
    }

    public render() {
        return (
            <GlobalContext.Provider value={{userStore: this.userStore, userActions: this.userActions}}>
                    <div>
                        <Header openSidebar={this.openSidebar}/>
                        <Switch>
                            <Route exact path="/settings" component={Settings}/>
                            <Route component={Game}/>
                        </Switch>
                        <Sidebar isOpen={this.state.isSidebarOpen} close={this.closeSidebar}/>
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

    private onUserStoreChange() {
        this.setState({
            user: this.userStore.getModel()
        });
    }

    private setUser(user: UserModel) {
        this.userStore.setModel(user);
    }

    private closeSidebar() {
        this.setState({
            isSidebarOpen: false
        });
    }

    private openSidebar() {
        this.setState({
            isSidebarOpen: true
        });
    }
}

export default withRouter(App);

export interface AppState {
    user: UserModel | null;
    isSidebarOpen: boolean;
}
