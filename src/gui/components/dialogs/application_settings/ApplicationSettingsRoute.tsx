import { connect } from 'react-redux';
import ApplicationSettingsDialog from './ApplicationSettingsDialog';
import * as React from 'react';
import { User } from '../../../state/settings_state/model/User';
import { ErrorMessage } from '../../miscellaneous/ErrorMessage';
import UpdatePasswordActions from '../../../state/settings_state/actions/UpdatePasswordActions';
import UpdateSettingsActions from '../../../state/settings_state/actions/UpdateSettingsActions';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ApplicationSettings } from '../../../state/settings_state/model/ApplicationSettings';
import { AppState } from '../../../state/app_state/AppState';

const mapStateToProps = (state: AppState) => {
    return {
        settings: state.settings,
        errors: state.errors,
        userQuery: state.query.user
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updatePassword: (user: User, newPassword: string, oldPassword: string ) =>
            dispatch(UpdatePasswordActions.request({user, newPassword, oldPassword})),
        updateSettings: (settings: ApplicationSettings) => dispatch(UpdateSettingsActions.request(settings))
    };
};

export const ApplicationSettingsRoute = withRouter(connect(mapStateToProps, mapDispatchToProps)((props: RouteComponentProps & SettingsProps) => {
    const headerOptions = {
        close: () => props.history.push('/'),
        title: 'settings'
    };

    const updateSettings = (settings: ApplicationSettings) => {
        props.updateSettings(settings);
        props.history.push('/');
    };

    return (
        <ApplicationSettingsDialog {...props} headerOptions={headerOptions} updateSettings={updateSettings}/>
    );
}));

export interface SettingsProps {
    settings: ApplicationSettings;
    errors: ErrorMessage[];
    updatePassword(user: User, newPassword: string, oldPassword: string);
    updateSettings(settings: ApplicationSettings);
}
