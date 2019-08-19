import ApplicationSettingsDialog from './ApplicationSettingsDialog';
import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ControllerContext } from '../../panels/Context';
import { ControllerFacade } from '../../../controller/ControllerFacade';

export const ApplicationSettingsRoute = withRouter((props: RouteComponentProps) => {
    const headerOptions = {
        close: () => props.history.push('/'),
        title: 'settings'
    };

    return (
        <ControllerContext.Consumer>
            {
                (controllers: ControllerFacade) => (
                    <ApplicationSettingsDialog userController={controllers.userController} settingsController={controllers.settingsController} headerOptions={headerOptions}/>
                )
            }
        </ControllerContext.Consumer>
    );
});