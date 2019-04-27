import { RouteComponentProps, withRouter } from 'react-router';
import { AppState } from '../../../state/app/AppState';
import TurnOnAllLigthsActions from '../../../state/game/actions/debug_actions/TurnOnAllLigthsActions';
import DebugDialog, { DebugDialogProps } from './DebugDialog';
import { connect } from 'react-redux';
import React = require('react');

const mapStateToProps = (state: AppState) => {
    return {
        debugOptions: state.debugOptions
    };
};

const mapDispatchToProps = dispatch => ({
    setAreAllLightsTurnedOn: (areLightsOn: boolean) => dispatch(TurnOnAllLigthsActions.request(areLightsOn))
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

