import { connect } from 'react-redux';
import { AppState } from '../../../state/app/AppState';
import ApplicationSettingsDialog from './ApplicationSettingsDialog';
import * as React from 'react';
import { User } from '../../../state/user/User';
import { ErrorMessage } from '../../miscellaneous/ErrorMessage';
import UpdatePasswordActions from '../../../state/user/actions/UpdatePasswordActions';
import UpdateUserActions from '../../../state/user/actions/UpdateUserActions';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user,
        errors: state.errors,
        userQuery: state.query.user
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updatePassword: (user: User, newPassword: string, oldPassword: string ) =>
            dispatch(UpdatePasswordActions.request({user, newPassword, oldPassword})),
        updateUser: (user: User) => dispatch(UpdateUserActions.request(user))
    };
};

export const ApplicationSettingsRoute = withRouter(connect(mapStateToProps, mapDispatchToProps)((props: RouteComponentProps & SettingsProps) => {
    const headerOptions = {
        close: () => props.history.push('/'),
        title: 'settings'
    };

    const updateUser = (user: User) => {
        props.updateUser(user);
        props.history.push('/');
    };

    return (
        <ApplicationSettingsDialog {...props} headerOptions={headerOptions} updateUser={updateUser}/>
    );
}));

export interface SettingsProps {
    user: User;
    errors: ErrorMessage[];
    updatePassword(user: User, newPassword: string, oldPassword: string);
    updateUser(user: User);
}
