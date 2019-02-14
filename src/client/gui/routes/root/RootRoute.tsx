import * as React from 'react';
import { User } from '../../../state/user/User';
import { Redirect } from 'react-router-dom';


export class RootRoute extends React.Component<RootRouteProps, {}> {

    public render() {
        return null;
    }
}

export interface RootRouteProps {
    user: User | null;
}
