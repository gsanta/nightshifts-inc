import * as React from 'react';
import { Game } from './Game';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Login from './Login';

export class App extends React.Component<any, any> {
    public render() {
        return (
            <Router>
                <div>
                    <Game/>
                    <Route path="/login" exact component={Login} />
                </div>
            </Router>
        );
    }
}
