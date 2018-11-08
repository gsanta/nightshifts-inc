import * as React from 'react';
import {Modal, withStyles} from '@material-ui/core';
import TextField from './form/TextField';
require('./Login.scss');

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute' as 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4
    }
});


class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    public render() {
        return (
            <Modal open={true} className="the-game-modal">
                <div style={getModalStyle()} className={this.props.classes.paper}>
                <TextField
                    value={this.state.email}
                    onChange={(email: string) => {
                        this.setState({email});
                    }}
                    label="Email"
                />
                <TextField
                    topMargined
                    value={this.state.password}
                    onChange={(password: string) => {
                        this.setState({password});
                    }}
                    label="Password"
                    type="password"
                />
                </div>
            </Modal>
        );
    }
}

export default withStyles(styles)(Login);

export interface LoginState {
    email: string;
    password: string;
}

export interface LoginProps {
    classes: {
        paper: any;
    };
}
