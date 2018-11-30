import * as React from 'react';
import {Modal, withStyles} from '@material-ui/core';
import TextField from './form/TextField';
import Button from './form/Button';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { User } from '../stores/User';
import { UserQuery } from '../query/user/UserQuery';
import { FacebookLoginButton } from './form/FacebookLoginButton';
import _ from 'lodash';
import { ErrorMessage } from './ErrorMessage';

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

export const getMultiFieldErrorMessage = (errors: ErrorMessage[]) => {
    const filteredErrors = errors
        .filter(e => e.properties.length !== 0);

    if (filteredErrors.length > 0) {
        return filteredErrors[0].message;
    }

    return null;
};

export const getErrorMessage = (errors: ErrorMessage[], propertyName: string) => {
    const filteredErrors = errors
        .filter(e => e.properties.length !== 1)
        .filter(e => e.properties[0] !== propertyName);


    if (filteredErrors.length > 0) {
        return filteredErrors[0].message;
    }

    return null;
};

export const hasError = (errors: ErrorMessage[], propertyName: string) => {
    const filteredErrors = errors
        .filter(e => _.includes(e.properties[0], propertyName));

    return filteredErrors.length > 0;
};

class Signup extends React.Component<SignupProps, SignupState> {

    constructor(props: SignupProps) {
        super(props);

        this.signUp = this.signUp.bind(this);
        this.signupFacebook = this.signupFacebook.bind(this);

        this.state = {
            email: '',
            password: '',
            errors: []
        };
    }

    public render() {
        if (this.props.user !== User.NULL_USER_MODEL) {
            return <Redirect to="/"/>;
        }

        return (
            <Modal open={true} className="the-game-modal">
                <div style={getModalStyle()} className={this.props.classes.paper}>
                    <ErrorLabel>{this.props.errors.length > 0 ? this.props.errors[0].message : null}</ErrorLabel>
                    <TextField
                        value={this.state.email}
                        onChange={(email: string) => {
                            this.setState({email});
                        }}
                        label="Email"
                        classes=""
                        hasError={hasError(this.state.errors, 'email')}
                        errorMessage={getErrorMessage(this.state.errors, 'email')}
                    />
                    <TextField
                        value={this.state.password}
                        onChange={(password: string) => {
                            this.setState({password});
                        }}
                        classes=""
                        label="Password"
                        type="password"
                        hasError={hasError(this.state.errors, 'email')}
                        errorMessage={getErrorMessage(this.state.errors, 'password')}
                    />
                    <Button text="Sign up" onClick={this.signUp}/>
                    <FacebookLoginButton
                        callback={this.signupFacebook}
                        text="Signup with Facebook"
                    />
                    {this.renderFooter()}
                </div>
            </Modal>
        );
    }

    private renderFooter() {
        return (
            <Footer>
                <div>Already have an account <Link to={`/login`}>Sign in</Link>.</div>
            </Footer>
        );
    }

    private signUp() {
        const userQuery = new UserQuery();

        userQuery.signup({ email: this.state.email, password: this.state.password})
        .then((user: User) => {
            this.props.setUser(user);
        })
        .catch((e) => {
            this.setState({
                errors: e.response.data.errors
            });
        });
    }

    private signupFacebook(event: {accessToken: string}) {
        const userQuery = new UserQuery();

        userQuery.loginFacebook(event.accessToken)
            .then((user: User) => {
                this.props.setUser(user);
            })
            .catch((e) => {
                console.log(e);
            });
    }
}

export default withStyles(styles)(Signup);

export interface SignupState {
    email: string;
    password: string;
    errors: ErrorMessage[];
}

export interface SignupProps {
    classes: {
        paper: any;
    };
    user: User;
    setUser(user: User): void;
}
