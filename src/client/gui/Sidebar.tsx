import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, withStyles, Divider, Avatar } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import InputIcon from '@material-ui/icons/Input';
import GamesIcon from '@material-ui/icons/Games';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AppState } from '../state/root/RootState';
import { UserQuery } from '../query/user/UserQuery';
import { connect } from 'react-redux';
import { User } from '../state/user/User';
import SignoutActions from '../state/user/actions/SignoutActions';

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user,
        userQuery: state.query.user,
        appLoadingState: state.appLoadingState
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        signout: (userQuery: UserQuery) => dispatch(SignoutActions.request()),
    };
};

const SidebarHeader = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const LinkStyled = styled(Link)`
    text-decoration: none;

    &:active, &:hover {
        text-decoration: none;
    }
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

class Sidebar extends React.Component<SidebarProps, {}> {
    public render() {
        if (!this.props.user) {
            return null;
        }

        return (
            <div>
                <Drawer
                    open={this.props.isOpen}
                    onClose={this.props.close}
                    variant={this.props.isPermanent ? 'permanent' : 'temporary'}
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
                            <LinkStyled to="/">
                                <ListItem button>
                                        <ListItemIcon>
                                            <GamesIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Game"/>
                                </ListItem>
                            </LinkStyled>
                            <LinkStyled to="/settings">
                                <ListItem button>
                                        <ListItemIcon>
                                            <SettingsIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Settings"/>
                                </ListItem>
                            </LinkStyled>
                            <ListItem button onClick={() => this.props.signout()}>
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
        return this.props.user.getEmail() && this.props.user.getEmail()[0].toUpperCase();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Sidebar));

export interface SidebarProps {
    isOpen: boolean;
    close(): void;
    classes?: any;
    isPermanent: boolean;
    user: User;
    signout(): void;
}
