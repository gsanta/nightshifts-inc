import { AppState } from '../../../state/app_state/AppState';
import { connect } from 'react-redux';
import LoginDialog from './LoginDialog';
import * as React from 'react';
import LoginFacebookActions from '../../../state/user_state/user_actions/LoginFacebookActions';
import { User } from '../../../state/user_state/user_model/User';
import LoginActions from '../../../state/user_state/user_actions/LoginActions';
import { ErrorMessage } from '../../miscellaneous/ErrorMessage';
import LoginWithTemporaryUserActions from '../../../state/user_state/user_actions/LoginWithTemporaryUserActions';

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user,
        errors: state.errors
    };
};

const mapDispatchToProps = dispatch => ({
    loginFacebook: (accessToken: string) => dispatch(LoginFacebookActions.request(accessToken)),
    login: (email: string, password: string) => dispatch(LoginActions.request({email, password})),
    loginWithTemporaryUser: () => dispatch(LoginWithTemporaryUserActions.request())
});

export const LoginRoute = connect(mapStateToProps, mapDispatchToProps)((props: LoginRouteProps) => {

    return (
        <LoginDialog {...props}/>
    );
});

export interface LoginRouteProps {
    loginFacebook(accessToken: string): void;
    login(email: string, password: string): void;
    loginWithTemporaryUser(): void;
    user: User;
    errors: ErrorMessage[];
}
