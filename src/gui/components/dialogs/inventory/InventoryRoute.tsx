
import { connect } from 'react-redux';
import { ToolIcon } from './tools_icons/ToolIcon';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as React from 'react';
import InventoryDialog, { InventoryDialogProps } from './InventoryDialog';
import { AppState } from '../../../state/app_state/AppState';
import { ControllerFacade } from '../../../controller/ControllerFacade';
import { ControllerContext } from '../../panels/Context';

export const InventoryRoute = withRouter(((props: RouteComponentProps & InventoryDialogProps) => {
    const headerOptions = {
        close: () => props.history.push('/'),
        title: 'inventory'
    };

    return (
        <ControllerContext.Consumer>
            {
                (controllers: ControllerFacade) => (
                    <InventoryDialog {...props} toolController={controllers.toolController} headerOptions={headerOptions}/>
                )
            }
        </ControllerContext.Consumer>
    );
}));

