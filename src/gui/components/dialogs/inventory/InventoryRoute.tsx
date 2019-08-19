
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ControllerFacade } from '../../../controller/ControllerFacade';
import { ControllerContext } from '../../panels/Context';
import InventoryDialog, { InventoryDialogProps } from './InventoryDialog';

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

