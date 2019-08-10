
import GrabToolActions from '../../../state/tools_state/tools_actions/GrabToolActions';
import { connect } from 'react-redux';
import { ToolIcon } from './tools_icons/ToolIcon';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as React from 'react';
import InventoryDialog, { InventoryDialogProps } from './InventoryDialog';
import ReleaseToolActions from '../../../state/tools_state/tools_actions/ReleaseToolActions';
import { AppState } from '../../../state/app_state/AppState';

const mapStateToProps = (state: AppState) => {
    return {
        tools: state.tools
    };
};

const mapDispatchToProps = dispatch => ({
    grabTool: (tool: ToolIcon, index: number) => dispatch(GrabToolActions.request(tool, index)),
    releaseTool: (tool: ToolIcon) => dispatch(ReleaseToolActions.request(tool))
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

