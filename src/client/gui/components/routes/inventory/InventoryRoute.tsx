
import { AppState } from '../../../../state/root/RootState';
import GrabToolActions from '../../../../state/game/actions/GrabToolActions';
import { connect } from 'react-redux';
import { Tool } from '../../dialogs/inventory/Tool';
import InventoryDialog from '../../dialogs/inventory/InventoryDialog';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { InventoryDialogProps } from '../../dialogs/inventory/InventoryDialog';
import * as React from 'react';

const mapStateToProps = (state: AppState) => {
    return {
        tools: state.tools
    };
};

const mapDispatchToProps = dispatch => ({
    grabTool: (tool: Tool) => dispatch(GrabToolActions.request(tool))
});

export const InventoryRoute = withRouter(connect(mapStateToProps, mapDispatchToProps)((props: RouteComponentProps & InventoryDialogProps) => {
    const headerOptions = {
        close: () => props.history.push('/'),
        title: 'inventory'
    };

    return (
        <InventoryDialog {...props} headerOptions={headerOptions}/>
    );
}));

