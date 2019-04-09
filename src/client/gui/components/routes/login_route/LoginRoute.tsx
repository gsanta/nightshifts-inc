import { AppState } from '../../../../state/root/RootState';
import { connect } from 'react-redux';
import LoginDialog from '../../dialogs/login_dialog/LoginDialog';
import * as React from 'react';

const mapStateToProps = (state: AppState) => {
    return {
    };
};

const mapDispatchToProps = dispatch => ({
});

export const LoginRoute = connect(mapStateToProps, mapDispatchToProps)((props: {}) => {

    return (
        <LoginDialog/>
    );
});
