import * as React from 'react';
import {Modal, withStyles} from '@material-ui/core';
import TextField from './form/TextField';
import Button from './form/Button';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { User } from '../stores/User';
import { UserQuery } from '../query/user/UserQuery';
import { FacebookLoginButton } from './form/FacebookLoginButton';

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

const Footer = styled.div`
    margin-top: 5px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
`;

class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props);

        this.login = this.login.bind(this);
        this.loginFacebook = this.loginFacebook.bind(this);

        this.state = {
            email: '',
            password: ''
        };

    }

    public render() {
        if (this.props.user !== User.NULL_USER_MODEL) {
            return <Redirect to="/"/>;
        }

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
                        value={this.state.password}
                        onChange={(password: string) => {
                            this.setState({password});
                        }}
                        label="Password"
                        type="password"
                    />
                    <Button text="Sign in" onClick={this.login}/>
                    <FacebookLoginButton
                        callback={this.loginFacebook}
                        text="Signin with Facebook"
                    />
                    {this.renderFooter()}
                </div>
            </Modal>
        );
    }

    private loginFacebook(event: {accessToken: string}) {
        const userQuery = new UserQuery();

        userQuery.loginFacebook(event.accessToken)
            .then((user: User) => {
                this.props.setUser(user);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    private renderFooter() {
        return (
            <Footer>
                <div>Forgot password?</div>
                <div>No account? <Link to={`/signup`}>Sign up</Link>.</div>
            </Footer>
        );
    }

    private login() {
        const userQuery = new UserQuery();

        userQuery.login({ email: this.state.email, password: this.state.password})
        .then((user: User) => {
            this.props.setUser(user);
        })
        .catch((e) => {
            console.log(e);
        });
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
    user: User;
    setUser(user: User): void;
}
