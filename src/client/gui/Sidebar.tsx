import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, withStyles, Divider, Avatar } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import InputIcon from '@material-ui/icons/Input';
import { GlobalContext, GlobalProps } from './App';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SidebarHeader = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const LinkStyled = styled(Link)`
    text-decoration: none;
`;

const styles = theme => ({
    drawer: {
        width: 240,
        flexShrink: 0
    },
    drawerPaper: {
        width: 240,
    }
});


class Sidebar extends React.Component<GlobalProps & SidebarProps, {}> {

    public componentDidUpdate(prevProps: any) {
        if ((this.props as any) as any !== prevProps.location) {
            console.log('location changed: ' + (this.props as any).location);
        }
    }

    public render() {
        if (!this.props.userStore.getModel()) {
            return null;
        }

        return (
            <div>
                <Drawer
                    open={this.props.isOpen}
                    onClose={this.props.close}
                    className={this.props.classes.drawer}
                    classes={{
                        paper: this.props.classes.drawerPaper,
                    }}
                >
                    <SidebarHeader>
                        <Avatar className={this.props.classes.avatar}>{this.getCapitalizedFirstLetterOfEmail()}</Avatar>
                    </SidebarHeader>
                    <div
                        tabIndex={0}
                        role="button"
                    >
                        <Divider/>
                        <List component="nav">
                            <LinkStyled to="/settings">
                                <ListItem button>
                                        <ListItemIcon>
                                            <SettingsIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Settings"/>
                                </ListItem>
                            </LinkStyled>
                            <ListItem button>
                                <ListItemIcon>
                                    <InputIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Sign out"/>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </div>
        );
    }

    private getCapitalizedFirstLetterOfEmail() {
        return this.props.userStore.getModel().getEmail()[0].toUpperCase();
    }
}

const SidebarStyled = withStyles(styles)(Sidebar);

export default (props: SidebarProps) => (
    <GlobalContext.Consumer>
        {(globalProps: GlobalProps) => <SidebarStyled {...globalProps} {...props}/>}
    </GlobalContext.Consumer>
);

export interface SidebarProps {
    isOpen: boolean;
    close(): void;
    classes?: any;
}
