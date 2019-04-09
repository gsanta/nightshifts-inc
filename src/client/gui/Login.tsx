import * as React from 'react';
import {withStyles} from '@material-ui/core';
import TextField from './form/TextField';
import Button from './form/Button';
import { Link, Redirect } from 'react-router-dom';
import { User } from '../state/user/User';
import { FacebookLoginButton } from './form/FacebookLoginButton';
import FormDialogWrapper, { getMultiFieldErrorMessage } from './dialogs/FormDialogWrapper';
import { ErrorMessage } from './ErrorMessage';
import { hasError, getErrorMessage } from './dialogs/FormDialogWrapper';
import { AppState } from '../state/root/RootState';
import LoginActions from '../state/user/actions/LoginActions';
import LoginFacebookActions from '../state/user/actions/LoginFacebookActions';
import { connect } from 'react-redux';

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

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user,
        errors: state.errors
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (email: string, password: string) => dispatch(LoginActions.request({email, password})),
        loginFacebook: (accessToken: string) => dispatch(LoginFacebookActions.request(accessToken)),
    };
};

class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
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
                            hasError={hasError(this.props.errors, 'email')}
                            errorMessage={getErrorMessage(this.props.errors, 'email')}
                            classes=""
                            label="Email"
                        />
                        <TextField
                            value={this.state.password}
                            onChange={(password: string) => {
                                this.setState({password});
                            }}
                            hasError={hasError(this.props.errors, 'password')}
                            errorMessage={getErrorMessage(this.props.errors, 'password')}
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
                errorMessage={getMultiFieldErrorMessage(this.props.errors)}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));

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
    errors: ErrorMessage[];
}
