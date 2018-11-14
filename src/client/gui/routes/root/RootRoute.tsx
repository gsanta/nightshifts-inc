import * as React from 'react';
import { UserModel } from '../../../stores/UserModel';
import { Redirect } from 'react-router-dom';


export class RootRoute extends React.Component<RootRouteProps, {}> {

    public render() {
        if (this.props.user === UserModel.NULL_USER_MODEL) {
            return <Redirect to="/login"/>;
        }

        return null;
    }
}

export interface RootRouteProps {
    user: UserModel | null;
}
