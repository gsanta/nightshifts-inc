import * as React from 'react';
import { ControllerFacade } from '../../../controller/ControllerFacade';
import { ControllerContext } from '../../panels/Context';
import LoginDialog from './LoginDialog';


export const LoginRoute = () => {

    return (
        <ControllerContext.Consumer>
            {
                (controllers: ControllerFacade) => (
                    <LoginDialog userController={controllers.userController}/>
                )
            }
        </ControllerContext.Consumer>
    );
};
