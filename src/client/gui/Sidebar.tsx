import * as React from 'react';
import { Drawer } from '@material-ui/core';
import { GlobalContext, GlobalProps } from './App';

class Sidebar extends React.Component<GlobalProps & SidebarProps, {}> {

    public render() {
        if (!this.props.userStore.getModel()) {
            return null;
        }

        return (
            <div>
                <Drawer open={this.props.isOpen} onClose={this.props.close}>
                    <div
                        tabIndex={0}
                        role="button"
                        style={{width: '250px'}}
                    >
                        {this.props.userStore.getModel().getEmail()}
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default (props: SidebarProps) => (
    <GlobalContext.Consumer>
        {(globalProps: GlobalProps) => <Sidebar {...globalProps} {...props}/>}
    </GlobalContext.Consumer>
);

export interface SidebarProps {
    isOpen: boolean;
    close(): void;
}
