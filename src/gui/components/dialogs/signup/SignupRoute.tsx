import * as React from 'react';
import { ControllerFacade } from '../../../controller/ControllerFacade';
import { ControllerContext } from '../../panels/Context';
import SignupDialog from './SignupDialog';

export const SignupRoute = () => {

    return (
        <ControllerContext.Consumer>
            {
                (controllers: ControllerFacade) => (
                    <SignupDialog userController={controllers.userController} />
                )
            }
        </ControllerContext.Consumer>
    );
};
