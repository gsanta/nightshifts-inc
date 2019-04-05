import { connect } from 'react-redux';
import { AppState } from '../../../../state/root/RootState';
import ApplicationSettingsDialog from '../../dialogs/application_settings/ApplicationSettingsDialog';
import * as React from 'react';

const mapStateToProps = (state: AppState) => {
    return {
        tools: state.tools
    };
};

const mapDispatchToProps = dispatch => ({
});



export const ApplicationSettingsRoute = connect(mapStateToProps, mapDispatchToProps)(() => {

    return (

        <ApplicationSettingsDialog footerOptions={{onSubmit: () => alert('submit')}}/>
    )
});
