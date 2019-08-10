import { RouteComponentProps, withRouter } from 'react-router';
import DebugDialog, { DebugDialogProps } from './DebugDialog';
import { connect } from 'react-redux';
import React = require('react');
import TurnOnAllLigthsActions from '../../../state/debug_state/debug_actions/TurnOnAllLigthsActions';
import ShowRoomLabelsActions from '../../../state/debug_state/debug_actions/ShowRoomLabelsActions';
import ShowBoundingBoxesActions from '../../../state/debug_state/debug_actions/ShowBoundingBoxesActions';
import { AppState } from '../../../state/app_state/AppState';

const mapStateToProps = (state: AppState) => {
    return {
        debugOptions: state.debugOptions
    };
};

const mapDispatchToProps = dispatch => ({
    setAreAllLightsTurnedOn: (areLightsOn: boolean) => dispatch(TurnOnAllLigthsActions.request(areLightsOn)),
    setShowRoomLabels: (showRoomLabels: boolean) => dispatch(ShowRoomLabelsActions.request(showRoomLabels)),
    setShowBoundingBoxes: (showBoundingBoxes: boolean) => dispatch(ShowBoundingBoxesActions.request(showBoundingBoxes))
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

