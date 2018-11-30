import * as React from 'react';
import {Modal, withStyles} from '@material-ui/core';
import TextField from './form/TextField';
import Button from './form/Button';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { User } from '../stores/User';
import { UserQuery } from '../query/user/UserQuery';
import { FacebookLoginButton } from './form/FacebookLoginButton';
import { ValidationError } from '../stores/ValidationError';
import { colors } from './styles';
import { FormDialogWrapper } from './dialogs/FormDialogWrapper';
import { hasError } from './Signup';

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
        padding: theme.spacing.unit * 4,
        paddingTop: '10px',
    }
});

const Footer = styled.div`
    margin-top: 5px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
`;

const ErrorLabel = styled.div`
    height: 20px;
    margin-bottom: 5px;
    color: ${colors.Red};
    font-size: 12px;
`;

class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props);

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
            <FormDialogWrapper
                body={
                    <React.Fragment>
                        <TextField
                            value={this.state.email}
                            onChange={(email: string) => {
                                this.setState({email});
                            }}
                            hasError={false}
                            classes=""
                            label="Email"
                        />
                        <TextField
                            value={this.state.password}
                            onChange={(password: string) => {
                                this.setState({password});
                            }}
                            hasError={false}
                            classes=""
                            label="Password"
                            type="password"
                        />
                        <Button text="Sign in" onClick={() => this.props.login(this.state.email, this.state.password)}/>
                        <FacebookLoginButton
                            callback={(event: {accessToken: string}) => this.props.loginFacebook(event.accessToken)}
                            text="Signin with Facebook"
                        />
                    </React.Fragment>
                }
                footer={
                    <React.Fragment>
                        <div>Forgot password?</div>
                        <div>No account? <Link to={`/signup`}>Sign up</Link>.</div>
                    </React.Fragment>
                }
            />
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
    user: User;
    login(email: string, password: string): void;
    loginFacebook(accessToken: string): void;
    errors: ValidationError[];
}
