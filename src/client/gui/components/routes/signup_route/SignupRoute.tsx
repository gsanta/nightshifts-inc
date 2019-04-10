import { AppState } from '../../../../state/root/RootState';
import * as React from 'react';
import { connect } from 'react-redux';
import SignupDialog from '../../dialogs/signup_dialog/SignupDialog';

const mapStateToProps = (state: AppState) => {
    return {
    };
};

const mapDispatchToProps = dispatch => ({
});

export const SignupRoute = connect(mapStateToProps, mapDispatchToProps)((props: {}) => {

    return (
        <SignupDialog/>
    );
});
