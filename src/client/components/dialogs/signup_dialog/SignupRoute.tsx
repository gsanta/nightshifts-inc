import { AppState } from '../../../state/app_state/AppState';
import * as React from 'react';
import { connect } from 'react-redux';
import SignupDialog from '../../dialogs/signup_dialog/SignupDialog';
import { User } from '../../../state/settings_state/model/User';
import LoginFacebookActions from '../../../state/settings_state/actions/LoginFacebookActions';
import SignupActions from '../../../state/settings_state/actions/SignupActions';
import { ErrorMessage } from '../../miscellaneous/ErrorMessage';

const mapStateToProps = (state: AppState) => {
    return {
        user: state.settings.user,
        errors: state.errors
    };
};

const mapDispatchToProps = dispatch => ({
    loginFacebook: (accessToken: string) => dispatch(LoginFacebookActions.request(accessToken)),
    signup: (email: string, password: string) => dispatch(SignupActions.request({email, password}))
});

export const SignupRoute = connect(mapStateToProps, mapDispatchToProps)((props: SignupRouteProps) => {

    return (
        <SignupDialog {...props}/>
    );
});

export interface SignupRouteProps {
    loginFacebook(accessToken: string): void;
    signup(email: string, password: string): void;
    user: User;
    errors: ErrorMessage[];
}
