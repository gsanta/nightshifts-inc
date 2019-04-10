import { connect } from 'react-redux';
import { AppState } from '../../../../state/root/RootState';
import ApplicationSettingsDialog from '../../dialogs/application_settings/ApplicationSettingsDialog';
import * as React from 'react';
import { User } from '../../../../state/user/User';
import { ErrorMessage } from '../../../ErrorMessage';
import UpdatePasswordActions from '../../../../state/user/actions/UpdatePasswordActions';
import UpdateUserActions from '../../../../state/user/actions/UpdateUserActions';
import { FormGroup } from 'react-bootstrap';
import styled from 'styled-components';

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user,
        dataLoadingState: state.dataLoadingState,
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

export const ApplicationSettingsRoute = connect(mapStateToProps, mapDispatchToProps)((props: SettingsProps) => {

    return (
        <ApplicationSettingsDialog
            user={props.user}
        />
    );
});

export interface SettingsProps {
    user: User;
    errors: ErrorMessage[];
    updatePassword(newPassword: string, oldPassword: string);
    updateUser(user: User);
}
