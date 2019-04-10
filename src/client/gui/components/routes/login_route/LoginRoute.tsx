import { AppState } from '../../../../state/root/RootState';
import { connect } from 'react-redux';
import LoginDialog from '../../dialogs/login_dialog/LoginDialog';
import * as React from 'react';
import LoginFacebookActions from '../../../../state/user/actions/LoginFacebookActions';
import { User } from '../../../../state/user/User';
import LoginActions from '../../../../state/user/actions/LoginActions';
import { ErrorMessage } from '../../../ErrorMessage';

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user,
        errors: state.errors
    };
};

const mapDispatchToProps = dispatch => ({
    loginFacebook: (accessToken: string) => dispatch(LoginFacebookActions.request(accessToken)),
    login: (email: string, password: string) => dispatch(LoginActions.request({email, password}))
});

export const LoginRoute = connect(mapStateToProps, mapDispatchToProps)((props: LoginRouteProps) => {

    return (
        <LoginDialog {...props}/>
    );
});

export interface LoginRouteProps {
    loginFacebook(accessToken: string): void;
    login(email: string, password: string): void;
    user: User;
    errors: ErrorMessage[];
}
