import { AppState } from '../../../../state/root/RootState';
import { connect } from 'react-redux';
import LoginDialog from '../../dialogs/login_dialog/LoginDialog';
import * as React from 'react';
import LoginFacebookActions from '../../../../state/user/actions/LoginFacebookActions';
import { User } from '../../../../state/user/User';

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user,
        errors: state.errors
    };
};

const mapDispatchToProps = dispatch => ({
    loginFacebook: (accessToken: string) => dispatch(LoginFacebookActions.request(accessToken)),
});

export const LoginRoute = connect(mapStateToProps, mapDispatchToProps)((props: LoginRouteProps) => {

    return (
        <LoginDialog loginFacebook={props.loginFacebook} user={props.user}/>
    );
});

export interface LoginRouteProps {
    loginFacebook(accessToken: string): void;
    user: User;
}
