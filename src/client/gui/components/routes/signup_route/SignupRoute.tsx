import { AppState } from '../../../../state/root/RootState';
import * as React from 'react';
import { connect } from 'react-redux';
import SignupDialog from '../../dialogs/signup_dialog/SignupDialog';
import { User } from '../../../../state/user/User';
import LoginFacebookActions from '../../../../state/user/actions/LoginFacebookActions';
import SignupActions from '../../../../state/user/actions/SignupActions';
import { ErrorMessage } from '../../../ErrorMessage';

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user,
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
