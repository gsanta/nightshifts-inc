import * as React from 'react';
import { Game } from './Game';
import { HashRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

export class App extends React.Component<any, any> {
    public render() {
        return (
            <Router>
                <div>
                    <Game/>
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />
                </div>
            </Router>
        );
    }
}
