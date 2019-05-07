import { RouteComponentProps, withRouter } from 'react-router';
import { AppState } from '../../../state/app_state/AppState';
import TurnOnAllLigthsActions from '../../../state/debug_state/debug_actions/TurnOnAllLigthsActions';
import DebugDialog, { DebugDialogProps } from './DebugDialog';
import { connect } from 'react-redux';
import React = require('react');
import ShowRoomLabelsActions from '../../../state/debug_state/debug_actions/ShowRoomLabelsActions';

const mapStateToProps = (state: AppState) => {
    return {
        debugOptions: state.debugOptions
    };
};

const mapDispatchToProps = dispatch => ({
    setAreAllLightsTurnedOn: (areLightsOn: boolean) => dispatch(TurnOnAllLigthsActions.request(areLightsOn)),
    setShowRoomLabels: (showRoomLabels: boolean) => dispatch(ShowRoomLabelsActions.request(showRoomLabels))
});

export const DebugRoute = withRouter(connect(mapStateToProps, mapDispatchToProps)((props: RouteComponentProps & DebugDialogProps) => {
    const headerOptions = {
        close: () => props.history.push('/'),
        title: 'debug'
    };

    return (
        <DebugDialog {...props} headerOptions={headerOptions}/>
    );
}));

