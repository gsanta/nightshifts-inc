import * as React from 'react';
import {withStyles} from '@material-ui/core';
import TextField from './form/TextField';
import Button from './form/Button';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { User } from '../state/user/User';
import { FacebookLoginButton } from './form/FacebookLoginButton';
import * as _ from 'lodash';
import { ErrorMessage } from './ErrorMessage';
import FormDialogWrapper, { hasError, getErrorMessage } from './dialogs/FormDialogWrapper';
import { AppState } from '../state/root/RootState';
import LoginFacebookActions from '../state/user/actions/LoginFacebookActions';
import SignupActions from '../state/user/actions/SignupActions';
import { connect } from 'react-redux';

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

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user,
        errors: state.errors
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loginFacebook: (accessToken: string) => dispatch(LoginFacebookActions.request(accessToken)),
        signup: (email: string, password: string) => dispatch(SignupActions.request({email, password}))
    };
};

class Signup extends React.Component<SignupProps, SignupState> {

    constructor(props: SignupProps) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    public render() {
        if (this.props.user) {
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
                            label="Email"
                            classes=""
                            hasError={hasError(this.props.errors, 'email')}
                            errorMessage={getErrorMessage(this.props.errors, 'email')}
                        />
                        <TextField
                            value={this.state.password}
                            onChange={(password: string) => {
                                this.setState({password});
                            }}
                            classes=""
                            label="Password"
                            type="password"
                            hasError={hasError(this.props.errors, 'password')}
                            errorMessage={getErrorMessage(this.props.errors, 'password')}
                        />
                        <Button text="Sign up" onClick={() => this.props.signup(this.state.email, this.state.password)}/>
                        <FacebookLoginButton
                            callback={(event: {accessToken: string}) => this.props.signupFacebook(event.accessToken)}
                        />
                    </React.Fragment>
                }
                footer={
                    <React.Fragment>
                        {this.renderFooter()}
                    </React.Fragment>
                }
            />
        );
    }

    private renderFooter() {
        return (
            <Footer>
                <div>Already have an account <Link to={`/login`}>Sign in</Link>.</div>
            </Footer>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Signup));

export interface SignupState {
    email: string;
    password: string;
}

export interface SignupProps {
    classes: {
        paper: any;
    };
    user: User;
    signup(email: string, password: string): void;
    signupFacebook(accessToken: string): void;
    errors: ErrorMessage[];
}
