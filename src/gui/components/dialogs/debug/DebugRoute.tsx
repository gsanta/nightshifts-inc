import { RouteComponentProps, withRouter } from 'react-router';
import DebugDialog, { DebugDialogProps } from './DebugDialog';
import React = require('react');
import { ControllerContext } from '../../panels/Context';
import { ControllerFacade } from '../../../controller/ControllerFacade';


export const DebugRoute = withRouter((props: RouteComponentProps & DebugDialogProps, context: ControllerFacade) => {
    const headerOptions = {
        close: () => props.history.push('/'),
        title: 'debug'
    };

    return (
        <ControllerContext.Consumer>
        {
            (controllers: ControllerFacade) => (
                <DebugDialog headerOptions={headerOptions} debugController={controllers.debugController}/>
            )
        }
    </ControllerContext.Consumer>
    );
});

DebugRoute.contextType = ControllerContext;

