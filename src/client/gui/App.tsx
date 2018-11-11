import * as React from 'react';
import { Game } from './Game';
import { HashRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import { UserStore } from '../stores/UserStore';
import { UserModel } from '../stores/UserModel';
import { Header } from './header/Header';

export class App extends React.Component<any, AppState> {
    private userStore: UserStore;

    constructor(props: any) {
        super(props);

        this.onUserStoreChange = this.onUserStoreChange.bind(this);
        this.setUser = this.setUser.bind(this);

        this.userStore = new UserStore();

        this.state = {
            user: null
        };
    }

    public componentDidMount() {
        this.userStore.onChange(this.onUserStoreChange);
    }

    public componentWillUnmount() {
        this.userStore.offChange(this.onUserStoreChange);
    }

    public render() {
        return (
            <Router>
                <div>
                    <Header user={this.userStore.getModel()}/>
                    <Game/>
                    <Route path="/login" exact render={(props) => <Login {...props} user={this.state.user} setUser={this.setUser}/>}/>
                    <Route
                        path="/signup"
                        exact
                        render={(props) => <Signup {...props} user={this.state.user} setUser={this.setUser}/>}/>
                </div>
            </Router>
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
}

export interface AppState {
    user: UserModel;
}
